"""
Varbi PhD Position Crawler
Scrapes Swedish university Varbi portals for funded PhD positions
matching ML, AI, LLM, Quantum keywords.
"""
import asyncio
import re
import os
from typing import Optional
from datetime import datetime
from playwright.async_api import async_playwright, Page

PORTAL_USERNAME = os.environ.get("PORTAL_USERNAME", "")
PORTAL_PASSWORD = os.environ.get("PORTAL_PASSWORD", "")

# All Swedish universities with Varbi portals
UNIVERSITY_PORTALS = [
    {"name": "KTH Royal Institute of Technology",   "code": "kth",          "qs": 76,  "city": "Stockholm"},
    {"name": "Karolinska Institute",                 "code": "ki",           "qs": 40,  "city": "Stockholm"},
    {"name": "Uppsala University",                   "code": "uu",           "qs": 99,  "city": "Uppsala"},
    {"name": "Lund University",                      "code": "lu",           "qs": 100, "city": "Lund"},
    {"name": "Stockholm University",                 "code": "su",           "qs": 107, "city": "Stockholm"},
    {"name": "Chalmers University of Technology",    "code": "chalmerssek",  "qs": 113, "city": "Gothenburg"},
    {"name": "University of Gothenburg",             "code": "gu",           "qs": 209, "city": "Gothenburg"},
    {"name": "Linköping University",                 "code": "liu",          "qs": 355, "city": "Linköping"},
    {"name": "Umeå University",                      "code": "umu",          "qs": 401, "city": "Umeå"},
    {"name": "Örebro University",                    "code": "oru",          "qs": 575, "city": "Örebro"},
    {"name": "Malmö University",                     "code": "mau",          "qs": 625, "city": "Malmö"},
    {"name": "Jönköping University",                 "code": "ju",           "qs": 725, "city": "Jönköping"},
    {"name": "Halmstad University",                  "code": "hh",           "qs": 900, "city": "Halmstad"},
    {"name": "Mid Sweden University",                "code": "miun",         "qs": 675, "city": "Sundsvall"},
    {"name": "Umeå University",                      "code": "umu",          "qs": 401, "city": "Umeå"},
    {"name": "Royal Institute of Technology",        "code": "kth",          "qs": 76,  "city": "Stockholm"},
]

# Deduplicate by code
seen_codes = set()
UNIQUE_PORTALS = []
for p in UNIVERSITY_PORTALS:
    if p["code"] not in seen_codes:
        seen_codes.add(p["code"])
        UNIQUE_PORTALS.append(p)

KEYWORDS = [
    "machine learning", "artificial intelligence", "deep learning",
    "neural network", "quantum", "nlp", "natural language",
    "language model", "llm", "large language", "computer vision",
    "reinforcement learning", "data science", "ai ", " ai,", "robotics",
    "generative", "transformer", "diffusion model", "foundation model",
]

def matches_keywords(text: str) -> bool:
    t = text.lower()
    return any(kw in t for kw in KEYWORDS)

def classify_areas(text: str) -> list[str]:
    t = text.lower()
    areas = []
    if any(k in t for k in ["quantum"]):
        areas.append("Quantum ML")
    if any(k in t for k in ["machine learning", "deep learning", "neural"]):
        areas.append("Machine Learning")
    if any(k in t for k in ["artificial intelligence", " ai ", "ai,"]):
        areas.append("Artificial Intelligence")
    if any(k in t for k in ["nlp", "natural language", "language model", "llm", "large language", "transformer"]):
        areas.append("NLP / LLMs")
    if any(k in t for k in ["computer vision", "image", "visual"]):
        areas.append("Computer Vision")
    if any(k in t for k in ["reinforcement learning", "rl ", "robot"]):
        areas.append("Robotics / RL")
    if any(k in t for k in ["generative", "diffusion", "foundation model", "gpt"]):
        areas.append("Generative AI")
    if any(k in t for k in ["data science", "data-driven"]):
        areas.append("Data Science")
    return areas or ["AI / ML"]


async def scrape_university(browser, portal: dict, log) -> list[dict]:
    """Scrape all matching PhD positions from one university's Varbi portal."""
    code = portal["code"]
    base_url = f"https://{code}.varbi.com/en/"
    positions = []

    page = await browser.new_page()
    try:
        log(f"Scraping {portal['name']} ({base_url})")
        resp = await page.goto(base_url, wait_until="domcontentloaded", timeout=25000)
        if not resp or resp.status >= 400:
            log(f"  Skipped {portal['name']}: HTTP {resp.status if resp else 'timeout'}")
            return []
        await asyncio.sleep(2)

        # Extract all job links — each job appears multiple times (title, city, date cols)
        all_links = await page.eval_on_selector_all(
            "a[href*='/what:job/jobID:']",
            "els => els.map(e => ({href: e.href, text: (e.innerText || e.textContent || '').trim()}))"
        )

        # Deduplicate by jobID, keep the longest text (title)
        jobs_by_id: dict[str, dict] = {}
        for lnk in all_links:
            m = re.search(r"jobID:(\d+)", lnk["href"])
            if not m:
                continue
            jid = m.group(1)
            if jid not in jobs_by_id or len(lnk["text"]) > len(jobs_by_id[jid]["text"]):
                jobs_by_id[jid] = {"id": jid, "text": lnk["text"], "href": lnk["href"]}

        log(f"  Found {len(jobs_by_id)} total positions at {portal['name']}")

        # Filter to keyword matches
        matching = [j for j in jobs_by_id.values() if matches_keywords(j["text"])]
        log(f"  {len(matching)} match ML/AI/Quantum keywords")

        # For each match, fetch the detail page
        for job in matching:
            try:
                detail = await _get_job_detail(page, job["href"], portal, log)
                if detail:
                    positions.append(detail)
            except Exception as e:
                log(f"  Detail error for {job['id']}: {e}")
                # Use what we have
                positions.append({
                    "jobId": job["id"],
                    "title": job["text"],
                    "university": portal["name"],
                    "universityCode": portal["code"],
                    "city": portal["city"],
                    "qsRanking": portal["qs"],
                    "applicationUrl": job["href"],
                    "deadline": "See posting",
                    "description": "",
                    "department": "",
                    "researchAreas": classify_areas(job["text"]),
                    "portalType": "Varbi",
                    "stipendUSD": 33000,
                    "scrapedAt": datetime.utcnow().isoformat(),
                })

    except Exception as e:
        log(f"  Error scraping {portal['name']}: {e}")
    finally:
        await page.close()

    return positions


async def _get_job_detail(page: Page, url: str, portal: dict, log) -> Optional[dict]:
    """Fetch individual job posting for full details."""
    await page.goto(url, wait_until="domcontentloaded", timeout=20000)
    await asyncio.sleep(1)

    text = await page.evaluate("() => document.body.innerText")
    title_el = await page.query_selector("h1, h2, [class*='title'], [class*='heading']")
    title = (await title_el.inner_text()).strip() if title_el else ""

    if not title:
        # Fallback: first bold or large text
        title = (text.split("\n")[0] if text else "").strip()

    # Extract deadline
    deadline = "Rolling"
    for line in text.split("\n"):
        line_l = line.lower()
        if any(k in line_l for k in ["deadline", "last application", "apply by", "closing date", "sista"]):
            date_match = re.search(r"\d{4}-\d{2}-\d{2}|\d{1,2}\s+\w+\s+\d{4}", line)
            if date_match:
                deadline = date_match.group(0)
                break

    # Extract department
    dept = ""
    for line in text.split("\n"):
        line_l = line.lower()
        if any(k in line_l for k in ["department", "school of", "division", "faculty", "avdelning"]):
            dept = line.strip()[:120]
            break

    m = re.search(r"jobID:(\d+)", url)
    job_id = m.group(1) if m else ""

    return {
        "jobId": job_id,
        "title": title or "PhD Position",
        "university": portal["name"],
        "universityCode": portal["code"],
        "city": portal["city"],
        "qsRanking": portal["qs"],
        "applicationUrl": url,
        "deadline": deadline,
        "description": text[:800].strip(),
        "department": dept,
        "researchAreas": classify_areas(title + " " + text[:500]),
        "portalType": "Varbi",
        "stipendUSD": 33000,
        "scrapedAt": datetime.utcnow().isoformat(),
    }


async def crawl_all(log=print, max_universities: int = 14) -> list[dict]:
    """Crawl all university portals and return matching positions."""
    all_positions = []

    async with async_playwright() as pw:
        browser = await pw.chromium.launch(headless=True)
        ctx = await browser.new_context(
            user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/124 Safari/537.36",
            locale="en-US",
        )

        portals = UNIQUE_PORTALS[:max_universities]
        log(f"Starting Varbi crawl — {len(portals)} universities")

        for portal in portals:
            positions = await scrape_university(ctx, portal, log)
            all_positions.extend(positions)
            log(f"  Running total: {len(all_positions)} positions")

        await ctx.close()
        await browser.close()

    # Sort by QS ranking (best first)
    all_positions.sort(key=lambda p: (p.get("qsRanking") or 999))
    log(f"\nCrawl complete — {len(all_positions)} ML/AI/Quantum PhD positions found")
    return all_positions


if __name__ == "__main__":
    results = asyncio.run(crawl_all())
    for r in results:
        print(f"[{r['university']}] {r['title']}")
        print(f"  URL: {r['applicationUrl']}")
        print(f"  Areas: {', '.join(r['researchAreas'])}")
        print(f"  Deadline: {r['deadline']}")
        print()
