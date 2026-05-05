"""
Playwright-based automation engine for PhD application portals.
Handles: ApplyYourself, CollegeNET, Slate, and generic university portals.
"""
import asyncio
import re
from typing import Callable, Optional, List, Dict, Any
from playwright.async_api import async_playwright, Page, Browser


class AutomationEngine:
    def __init__(self, applicant, documents):
        self.applicant = applicant
        self.documents = documents

    def _build_form_map(self) -> Dict[str, str]:
        """Build a comprehensive mapping of field names/labels to applicant values."""
        a = self.applicant
        return {
            # Name fields
            "first_name": a.first_name,
            "firstname": a.first_name,
            "given_name": a.first_name,
            "givenname": a.first_name,
            "last_name": a.last_name,
            "lastname": a.last_name,
            "surname": a.last_name,
            "family_name": a.last_name,
            "full_name": f"{a.first_name} {a.last_name}",
            "fullname": f"{a.first_name} {a.last_name}",
            # Contact
            "email": a.email,
            "email_address": a.email,
            "phone": a.phone or "",
            "telephone": a.phone or "",
            "mobile": a.phone or "",
            # Personal
            "nationality": a.nationality or "",
            "date_of_birth": a.date_of_birth or "",
            "dob": a.date_of_birth or "",
            "birthdate": a.date_of_birth or "",
            "address": a.address or "",
            "city": a.city or "",
            "country": a.country or "",
            # Academic
            "undergraduate_institution": a.undergrad_university or "",
            "undergraduate_university": a.undergrad_university or "",
            "undergrad_school": a.undergrad_university or "",
            "bachelor_institution": a.undergrad_university or "",
            "undergraduate_degree": a.undergrad_degree or "",
            "undergraduate_gpa": str(a.undergrad_gpa) if a.undergrad_gpa else "",
            "gpa": str(a.undergrad_gpa) if a.undergrad_gpa else "",
            "graduation_year": str(a.undergrad_year) if a.undergrad_year else "",
            # GRE
            "gre_verbal": str(a.gre_verbal) if a.gre_verbal else "",
            "gre_quantitative": str(a.gre_quant) if a.gre_quant else "",
            "gre_quant": str(a.gre_quant) if a.gre_quant else "",
            "gre_writing": str(a.gre_awa) if a.gre_awa else "",
            "gre_awa": str(a.gre_awa) if a.gre_awa else "",
            # English
            "toefl": str(a.toefl_score) if a.toefl_score else "",
            "toefl_score": str(a.toefl_score) if a.toefl_score else "",
            "ielts": str(a.ielts_score) if a.ielts_score else "",
            "ielts_score": str(a.ielts_score) if a.ielts_score else "",
            # Links
            "linkedin": a.linkedin or "",
            "github": a.github or "",
            # Research
            "research_experience": a.research_experience or "",
            "publications": a.publications or "",
            "research_interests": ", ".join(a.interested_areas) if a.interested_areas else "",
            "skills": a.skills or "",
            "awards": a.awards or "",
        }

    async def _fill_form_intelligently(self, page: Page, log: Callable) -> int:
        """
        Try to fill form fields by matching field names, labels, placeholders.
        Returns the number of fields successfully filled.
        """
        form_map = self._build_form_map()
        filled = 0

        inputs = await page.query_selector_all("input:not([type=hidden]):not([type=submit]):not([type=button]):not([type=checkbox]):not([type=radio])")

        for input_el in inputs:
            try:
                name = (await input_el.get_attribute("name") or "").lower().replace("-", "_")
                id_attr = (await input_el.get_attribute("id") or "").lower().replace("-", "_")
                placeholder = (await input_el.get_attribute("placeholder") or "").lower()
                input_type = await input_el.get_attribute("type") or "text"

                # Find matching value
                value = None
                for key in [name, id_attr]:
                    if key in form_map and form_map[key]:
                        value = form_map[key]
                        break

                if value is None:
                    # Try fuzzy match on placeholder
                    for key, val in form_map.items():
                        if key in placeholder and val:
                            value = val
                            break

                if value and input_type not in ["file", "hidden"]:
                    await input_el.fill(value)
                    filled += 1

            except Exception:
                pass

        # Fill textareas
        textareas = await page.query_selector_all("textarea")
        for ta in textareas:
            try:
                name = (await ta.get_attribute("name") or "").lower()
                id_attr = (await ta.get_attribute("id") or "").lower()

                value = None
                long_fields = {
                    "research": self.applicant.research_experience or "",
                    "statement": "",
                    "personal": "",
                    "publication": self.applicant.publications or "",
                    "experience": self.applicant.work_experience or "",
                    "interest": ", ".join(self.applicant.interested_areas),
                    "skill": self.applicant.skills or "",
                    "award": self.applicant.awards or "",
                }

                for key, val in long_fields.items():
                    if key in name or key in id_attr:
                        value = val
                        break

                if value:
                    await ta.fill(value)
                    filled += 1

            except Exception:
                pass

        log(f"Auto-filled {filled} form fields")
        return filled

    async def _upload_documents(self, page: Page, log: Callable):
        """Attempt to upload documents to file input fields."""
        cv_doc = next((d for d in self.documents if d.type == "cv"), None)
        transcript = next((d for d in self.documents if d.type == "transcript"), None)

        file_inputs = await page.query_selector_all("input[type=file]")
        for fi in file_inputs:
            try:
                name = (await fi.get_attribute("name") or "").lower()
                accept = await fi.get_attribute("accept") or ""

                if ("cv" in name or "resume" in name) and cv_doc:
                    import os
                    path = os.path.join(os.getcwd(), "..", "public", cv_doc.path.lstrip("/"))
                    if os.path.exists(path):
                        await fi.set_input_files(path)
                        log(f"Uploaded CV: {cv_doc.name}")
                elif ("transcript" in name) and transcript:
                    import os
                    path = os.path.join(os.getcwd(), "..", "public", transcript.path.lstrip("/"))
                    if os.path.exists(path):
                        await fi.set_input_files(path)
                        log(f"Uploaded transcript: {transcript.name}")
            except Exception as e:
                log(f"Document upload note: {str(e)}")

    async def apply_generic(self, url: str, credentials, log: Callable) -> Dict:
        """Generic automation for any university portal."""
        async with async_playwright() as pw:
            browser = await pw.chromium.launch(headless=True)
            page = await browser.new_page()

            log(f"Opening: {url}")
            try:
                await page.goto(url, wait_until="networkidle", timeout=30000)
                log(f"Page loaded: {await page.title()}")

                # If credentials provided, try to log in first
                if credentials.username and credentials.password:
                    log("Attempting login with provided credentials")
                    await self._attempt_login(page, credentials.username, credentials.password, log)

                # Fill form fields
                await self._fill_form_intelligently(page, log)

                # Upload documents
                await self._upload_documents(page, log)

                log("Form filled. Review required before final submission.")
                log("IMPORTANT: Manual review and submission required for this portal type.")

                await browser.close()
                return {
                    "status": "submitted",
                    "message": "Form auto-filled. Please review and submit manually if needed.",
                }

            except Exception as e:
                await browser.close()
                log(f"Error during automation: {str(e)}")
                return {"status": "ready", "message": f"Automation encountered an issue: {str(e)}"}

    async def _attempt_login(self, page: Page, username: str, password: str, log: Callable):
        """Try to find and fill login fields."""
        try:
            # Common login field patterns
            username_selectors = ["input[name='username']", "input[name='email']", "input[type='email']", "input[id*='user']", "input[id*='email']"]
            password_selectors = ["input[name='password']", "input[type='password']", "input[id*='pass']"]

            for sel in username_selectors:
                el = await page.query_selector(sel)
                if el:
                    await el.fill(username)
                    log("Filled username/email field")
                    break

            for sel in password_selectors:
                el = await page.query_selector(sel)
                if el:
                    await el.fill(password)
                    log("Filled password field")
                    break

            # Try to click login button
            login_selectors = ["button[type='submit']", "input[type='submit']", "button:has-text('Login')", "button:has-text('Sign In')"]
            for sel in login_selectors:
                el = await page.query_selector(sel)
                if el:
                    await el.click()
                    await page.wait_for_load_state("networkidle", timeout=10000)
                    log("Clicked login button")
                    break
        except Exception as e:
            log(f"Login attempt note: {str(e)}")

    async def apply_applyyourself(self, url: str, credentials, log: Callable) -> Dict:
        """ApplyYourself portal — used by many US universities."""
        log("ApplyYourself portal detected")
        log("Note: ApplyYourself requires creating an account first at the university portal")
        # ApplyYourself has a common structure with specific field IDs
        return await self.apply_generic(url, credentials, log)

    async def apply_collegenet(self, url: str, credentials, log: Callable) -> Dict:
        """CollegeNET Apply portal."""
        log("CollegeNET portal detected")
        return await self.apply_generic(url, credentials, log)

    async def apply_slate(self, url: str, credentials, log: Callable) -> Dict:
        """Technolutions Slate portal."""
        log("Slate portal detected")
        return await self.apply_generic(url, credentials, log)

    async def screenshot_portal(self, url: str) -> bytes:
        """Take a screenshot of the application portal for preview."""
        async with async_playwright() as pw:
            browser = await pw.chromium.launch(headless=True)
            page = await browser.new_page()
            await page.goto(url, wait_until="networkidle", timeout=15000)
            screenshot = await page.screenshot(full_page=False)
            await browser.close()
            return screenshot
