"""
PhD Apply - Automation Service
Uses Playwright to automatically fill and submit PhD applications
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import asyncio
import logging
from datetime import datetime
from engine import AutomationEngine

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="PhD Apply Automation", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ProgramInfo(BaseModel):
    name: str
    university: str
    application_url: str
    portal_type: Optional[str] = "Custom"
    deadline: Optional[str] = None


class ApplicantInfo(BaseModel):
    first_name: str
    last_name: str
    email: str
    phone: Optional[str] = None
    nationality: Optional[str] = None
    date_of_birth: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    country: Optional[str] = None
    linkedin: Optional[str] = None
    github: Optional[str] = None
    undergrad_university: Optional[str] = None
    undergrad_degree: Optional[str] = None
    undergrad_gpa: Optional[float] = None
    undergrad_year: Optional[int] = None
    master_university: Optional[str] = None
    master_degree: Optional[str] = None
    master_gpa: Optional[float] = None
    gre_verbal: Optional[int] = None
    gre_quant: Optional[int] = None
    gre_awa: Optional[float] = None
    toefl_score: Optional[int] = None
    ielts_score: Optional[float] = None
    research_experience: Optional[str] = None
    publications: Optional[str] = None
    interested_areas: List[str] = []
    work_experience: Optional[str] = None
    skills: Optional[str] = None
    awards: Optional[str] = None


class PortalCredentials(BaseModel):
    username: Optional[str] = None
    password: Optional[str] = None


class DocumentInfo(BaseModel):
    type: str
    name: str
    path: str


class ApplicationRequest(BaseModel):
    application_id: str
    program: ProgramInfo
    applicant: ApplicantInfo
    portal_credentials: PortalCredentials
    documents: List[DocumentInfo] = []


@app.get("/")
async def health():
    return {"status": "ok", "service": "PhD Apply Automation", "version": "1.0.0"}


@app.post("/apply")
async def apply(request: ApplicationRequest):
    """
    Main endpoint: automate a PhD application using Playwright.
    Supports ApplyYourself, CollegeNET, Slate, and generic portals.
    """
    log_lines = []

    def log(msg: str):
        ts = datetime.now().isoformat()
        line = f"[{ts}] {msg}"
        log_lines.append(line)
        logger.info(line)

    log(f"Starting application: {request.program.name} at {request.program.university}")
    log(f"Portal type: {request.program.portal_type}")
    log(f"Applicant: {request.applicant.first_name} {request.applicant.last_name}")

    engine = AutomationEngine(request.applicant, request.documents)

    try:
        portal = (request.program.portal_type or "").lower()

        if "applyyourself" in portal or "apply yourself" in portal:
            log("Using ApplyYourself automation handler")
            result = await engine.apply_applyyourself(
                request.program.application_url,
                request.portal_credentials,
                log
            )
        elif "collegenet" in portal or "college net" in portal:
            log("Using CollegeNET automation handler")
            result = await engine.apply_collegenet(
                request.program.application_url,
                request.portal_credentials,
                log
            )
        elif "slate" in portal:
            log("Using Slate automation handler")
            result = await engine.apply_slate(
                request.program.application_url,
                request.portal_credentials,
                log
            )
        else:
            log("Using generic form automation handler")
            result = await engine.apply_generic(
                request.program.application_url,
                request.portal_credentials,
                log
            )

        log(f"Automation complete: {result['status']}")
        return {
            "status": result["status"],
            "message": result.get("message", ""),
            "log": "\n".join(log_lines),
        }

    except Exception as e:
        log(f"ERROR: {str(e)}")
        raise HTTPException(status_code=500, detail={"error": str(e), "log": "\n".join(log_lines)})


@app.get("/status/{application_id}")
async def get_status(application_id: str):
    return {"application_id": application_id, "status": "unknown"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
