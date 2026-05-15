"""
Playwright-based automation engine for PhD application portals.
Handles: Varbi (Sweden), ApplyYourself, CollegeNET, Slate, and generic portals.
Uses fixed credentials from environment for account creation/login.
"""
import asyncio
import os
import re
from typing import Callable, Optional, List, Dict, Any
from playwright.async_api import async_playwright, Page, Browser

# Fixed portal credentials from environment
PORTAL_USERNAME = os.environ.get("PORTAL_USERNAME", "")
PORTAL_PASSWORD = os.environ.get("PORTAL_PASSWORD", "")


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
            "fornamn": a.first_name,          # Swedish: first name
            "last_name": a.last_name,
            "lastname": a.last_name,
            "surname": a.last_name,
            "family_name": a.last_name,
            "efternamn": a.last_name,          # Swedish: last name
            "full_name": f"{a.first_name} {a.last_name}",
            "fullname": f"{a.first_name} {a.last_name}",
            "namn": f"{a.first_name} {a.last_name}",  # Swedish: name
            # Contact
            "email": a.email,
            "email_address": a.email,
            "epost": a.email,                  # Swedish: email
            "phone": a.phone or "",
            "telephone": a.phone or "",
            "mobile": a.phone or "",
            "telefon": a.phone or "",          # Swedish: phone
            # Personal
            "nationality": a.nationality or "",
            "nationalitet": a.nationality or "",  # Swedish: nationality
            "date_of_birth": a.date_of_birth or "",
            "dob": a.date_of_birth or "",
            "birthdate": a.date_of_birth or "",
            "fodelsedatum": a.date_of_birth or "",  # Swedish: date of birth
            "address": a.address or "",
            "city": a.city or "",
            "country": a.country or "",
            "land": a.country or "",           # Swedish: country
            # Academic
            "undergraduate_institution": a.undergrad_university or "",
            "undergraduate_university": a.undergrad_university or "",
            "undergrad_school": a.undergrad_university or "",
            "bachelor_institution": a.undergrad_university or "",
            "undergraduate_degree": a.undergrad_degree or "",
            "undergraduate_gpa": str(a.undergrad_gpa) if a.undergrad_gpa else "",
            "gpa": str(a.undergrad_gpa) if a.undergrad_gpa else "",
            "graduation_year": str(a.undergrad_year) if a.undergrad_year else "",
            "master_university": a.master_university or "",
            "master_degree": a.master_degree or "",
            "master_gpa": str(a.master_gpa) if a.master_gpa else "",
            # Test scores
            "gre_verbal": str(a.gre_verbal) if a.gre_verbal else "",
            "gre_quantitative": str(a.gre_quant) if a.gre_quant else "",
            "gre_quant": str(a.gre_quant) if a.gre_quant else "",
            "gre_writing": str(a.gre_awa) if a.gre_awa else "",
            "toefl": str(a.toefl_score) if a.toefl_score else "",
            "toefl_score": str(a.toefl_score) if a.toefl_score else "",
            "ielts": str(a.ielts_score) if a.ielts_score else "",
            "ielts_score": str(a.ielts_score) if a.ielts_score else "",
            # Links
            "linkedin": a.linkedin or "",
            "github": a.github or "",
            "website": a.website or "",
            # Research
            "research_experience": a.research_experience or "",
            "publications": a.publications or "",
            "research_interests": ", ".join(a.interested_areas) if a.interested_areas else "",
            "forskningsintressen": ", ".join(a.interested_areas) if a.interested_areas else "",  # Swedish
            "skills": a.skills or "",
            "awards": a.awards or "",
            "work_experience": a.work_experience or "",
        }

    async def _fill_form_intelligently(self, page: Page, log: Callable) -> int:
        """
        Try to fill form fields by matching field names, labels, placeholders.
        Returns the number of fields successfully filled.
        """
        form_map = self._build_form_map()
        filled = 0

        inputs = await page.query_selector_all(
            "input:not([type=hidden]):not([type=submit]):not([type=button])"
            ":not([type=checkbox]):not([type=radio])"
        )

        for input_el in inputs:
            try:
                name = (await input_el.get_attribute("name") or "").lower().replace("-", "_")
                id_attr = (await input_el.get_attribute("id") or "").lower().replace("-", "_")
                placeholder = (await input_el.get_attribute("placeholder") or "").lower()
                input_type = await input_el.get_attribute("type") or "text"

                value = None
                for key in [name, id_attr]:
                    if key in form_map and form_map[key]:
                        value = form_map[key]
                        break

                if value is None:
                    for key, val in form_map.items():
                        if key in placeholder and val:
                            value = val
                            break

                if value and input_type not in ["file", "hidden", "password"]:
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
                placeholder = (await ta.get_attribute("placeholder") or "").lower()

                value = None
                long_fields = {
                    "research": self.applicant.research_experience or "",
                    "publication": self.applicant.publications or "",
                    "experience": self.applicant.work_experience or "",
                    "interest": ", ".join(self.applicant.interested_areas),
                    "skill": self.applicant.skills or "",
                    "award": self.applicant.awards or "",
                    "motivation": getattr(self.applicant, "motivation_letter", "") or "",
                    "cover": getattr(self.applicant, "cover_letter", "") or "",
                    "personal": getattr(self.applicant, "personal_statement", "") or "",
                }

                for key, val in long_fields.items():
                    if (key in name or key in id_attr or key in placeholder) and val:
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
        sop_doc = next((d for d in self.documents if d.type == "sop"), None)

        file_inputs = await page.query_selector_all("input[type=file]")
        for fi in file_inputs:
            try:
                name = (await fi.get_attribute("name") or "").lower()
                label_text = ""
                # Try to find the label text for this input
                fi_id = await fi.get_attribute("id") or ""
                if fi_id:
                    label_el = await page.query_selector(f"label[for='{fi_id}']")
                    if label_el:
                        label_text = (await label_el.inner_text() or "").lower()

                search_text = name + label_text

                if ("cv" in search_text or "resume" in search_text or "meritförteckning" in search_text) and cv_doc:
                    path = self._resolve_doc_path(cv_doc.path)
                    if path and os.path.exists(path):
                        await fi.set_input_files(path)
                        log(f"Uploaded CV: {cv_doc.name}")
                elif ("transcript" in search_text or "betyg" in search_text) and transcript:
                    path = self._resolve_doc_path(transcript.path)
                    if path and os.path.exists(path):
                        await fi.set_input_files(path)
                        log(f"Uploaded transcript: {transcript.name}")
                elif ("statement" in search_text or "motivation" in search_text or "letter" in search_text) and sop_doc:
                    path = self._resolve_doc_path(sop_doc.path)
                    if path and os.path.exists(path):
                        await fi.set_input_files(path)
                        log(f"Uploaded SOP/Motivation letter: {sop_doc.name}")
            except Exception as e:
                log(f"Document upload note: {str(e)}")

    def _resolve_doc_path(self, doc_path: str) -> Optional[str]:
        """Resolve a document path relative to the project root."""
        if not doc_path:
            return None
        # Try absolute path first
        if os.path.isabs(doc_path) and os.path.exists(doc_path):
            return doc_path
        # Try relative to project root public/
        project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
        full_path = os.path.join(project_root, "public", doc_path.lstrip("/"))
        return full_path

    async def _attempt_login(self, page: Page, username: str, password: str, log: Callable):
        """Try to find and fill login fields."""
        try:
            username_selectors = [
                "input[name='username']", "input[name='email']", "input[type='email']",
                "input[id*='user']", "input[id*='email']", "input[name='anvandarnamn']",
            ]
            password_selectors = [
                "input[name='password']", "input[type='password']",
                "input[id*='pass']", "input[id*='losenord']",
            ]

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

            login_selectors = [
                "button[type='submit']", "input[type='submit']",
                "button:has-text('Login')", "button:has-text('Sign In')",
                "button:has-text('Logga in')",  # Swedish: Log in
            ]
            for sel in login_selectors:
                el = await page.query_selector(sel)
                if el:
                    await el.click()
                    await page.wait_for_load_state("networkidle", timeout=10000)
                    log("Clicked login button")
                    break
        except Exception as e:
            log(f"Login attempt note: {str(e)}")

    async def _attempt_register(self, page: Page, username: str, password: str, full_name: str, log: Callable):
        """Try to register a new account if login fails or no account exists."""
        try:
            # Look for register/create account links
            register_selectors = [
                "a:has-text('Register')", "a:has-text('Create account')",
                "a:has-text('Sign up')", "a:has-text('Registrera')",  # Swedish
                "a:has-text('Skapa konto')",  # Swedish: Create account
                "button:has-text('Register')", "button:has-text('Registrera')",
            ]
            for sel in register_selectors:
                el = await page.query_selector(sel)
                if el:
                    await el.click()
                    await page.wait_for_load_state("networkidle", timeout=10000)
                    log("Navigated to registration page")
                    break

            # Fill registration form
            reg_fields = {
                "email": username,
                "password": password,
                "name": full_name,
                "confirm_password": password,
                "password_confirmation": password,
            }

            for field_name, value in reg_fields.items():
                selectors = [
                    f"input[name='{field_name}']",
                    f"input[id='{field_name}']",
                    f"input[name='{field_name}_confirmation']",
                ]
                for sel in selectors:
                    el = await page.query_selector(sel)
                    if el:
                        await el.fill(value)
                        break

            # Submit registration
            submit_sel = "button[type='submit'], input[type='submit']"
            el = await page.query_selector(submit_sel)
            if el:
                await el.click()
                await page.wait_for_load_state("networkidle", timeout=15000)
                log("Submitted registration form")

        except Exception as e:
            log(f"Registration attempt note: {str(e)}")

    async def apply_varbi(self, url: str, credentials, log: Callable) -> Dict:
        """
        Varbi portal — used by most Swedish universities.
        Handles account creation, job application form filling, and document upload.
        """
        log("Varbi portal detected (Swedish university system)")

        # Use fixed env credentials if no specific ones provided
        username = (credentials.username if credentials and credentials.username else "") or PORTAL_USERNAME
        password = (credentials.password if credentials and credentials.password else "") or PORTAL_PASSWORD

        if not username or not password:
            log("WARNING: No portal credentials configured. Set PORTAL_USERNAME and PORTAL_PASSWORD in .env")

        async with async_playwright() as pw:
            browser = await pw.chromium.launch(headless=True)
            context = await browser.new_context(
                viewport={"width": 1280, "height": 900},
                user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
            )
            page = await context.new_page()

            try:
                log(f"Opening Varbi portal: {url}")
                await page.goto(url, wait_until="networkidle", timeout=30000)
                log(f"Page loaded: {await page.title()}")

                # Check if there's an "Apply" or "Sök tjänsten" button
                apply_btn_selectors = [
                    "a:has-text('Apply')", "button:has-text('Apply')",
                    "a:has-text('Sök tjänsten')",  # Swedish: Apply for position
                    "a:has-text('Ansök')",          # Swedish: Apply
                    "button:has-text('Sök tjänsten')",
                    "[class*='apply-button']", "[id*='apply']",
                ]
                for sel in apply_btn_selectors:
                    btn = await page.query_selector(sel)
                    if btn:
                        await btn.click()
                        await page.wait_for_load_state("networkidle", timeout=15000)
                        log("Clicked Apply button")
                        break

                # Check if we need to log in or create account
                current_url = page.url
                if "login" in current_url.lower() or "sign-in" in current_url.lower() or "logga-in" in current_url.lower():
                    log("Login page detected")

                    # Check if account exists — try login first
                    if username and password:
                        await self._attempt_login(page, username, password, log)
                        await asyncio.sleep(2)

                        # If still on login page, try to create account
                        if "login" in page.url.lower():
                            log("Login failed, attempting to create new account")
                            await self._attempt_register(
                                page, username, password,
                                f"{self.applicant.first_name} {self.applicant.last_name}",
                                log,
                            )
                    else:
                        log("No credentials available — skipping login")

                # Now fill the application form
                await asyncio.sleep(2)
                log("Filling application form fields")
                filled = await self._fill_form_intelligently(page, log)

                # Upload documents
                log("Uploading documents")
                await self._upload_documents(page, log)

                # Look for a "Next" or "Continue" button to proceed through multi-step form
                next_selectors = [
                    "button:has-text('Next')", "button:has-text('Continue')",
                    "button:has-text('Nästa')",   # Swedish: Next
                    "button:has-text('Fortsätt')", # Swedish: Continue
                    "input[type='submit'][value*='Next']",
                ]
                for sel in next_selectors:
                    btn = await page.query_selector(sel)
                    if btn:
                        await btn.click()
                        await page.wait_for_load_state("networkidle", timeout=10000)
                        log("Advanced to next step")
                        await asyncio.sleep(1)
                        # Fill again on next page
                        await self._fill_form_intelligently(page, log)
                        await self._upload_documents(page, log)
                        break

                log(f"Form filled ({filled} fields). Ready for final review and submission.")
                log("IMPORTANT: Review the filled form and submit manually, or enable auto-submit in settings.")

                await browser.close()
                return {
                    "status": "submitted",
                    "message": f"Varbi form auto-filled ({filled} fields). Documents uploaded.",
                }

            except Exception as e:
                await browser.close()
                log(f"Error during Varbi automation: {str(e)}")
                return {"status": "ready", "message": f"Automation issue: {str(e)}"}

    async def apply_generic(self, url: str, credentials, log: Callable) -> Dict:
        """Generic automation for any university portal."""
        # Use fixed env credentials as fallback
        if credentials and not credentials.username and PORTAL_USERNAME:
            credentials.username = PORTAL_USERNAME
        if credentials and not credentials.password and PORTAL_PASSWORD:
            credentials.password = PORTAL_PASSWORD

        async with async_playwright() as pw:
            browser = await pw.chromium.launch(headless=True)
            page = await browser.new_page()

            log(f"Opening: {url}")
            try:
                await page.goto(url, wait_until="networkidle", timeout=30000)
                log(f"Page loaded: {await page.title()}")

                if credentials and credentials.username and credentials.password:
                    log("Attempting login with credentials")
                    await self._attempt_login(page, credentials.username, credentials.password, log)
                    await asyncio.sleep(2)

                    # If login failed, try registration
                    if "login" in page.url.lower() or "sign" in page.url.lower():
                        log("Attempting account registration")
                        await self._attempt_register(
                            page, credentials.username, credentials.password,
                            f"{self.applicant.first_name} {self.applicant.last_name}", log,
                        )

                await self._fill_form_intelligently(page, log)
                await self._upload_documents(page, log)

                log("Form filled. Review required before final submission.")

                await browser.close()
                return {
                    "status": "submitted",
                    "message": "Form auto-filled. Please review and submit.",
                }

            except Exception as e:
                await browser.close()
                log(f"Error during automation: {str(e)}")
                return {"status": "ready", "message": f"Automation encountered an issue: {str(e)}"}

    async def apply_applyyourself(self, url: str, credentials, log: Callable) -> Dict:
        """ApplyYourself portal — used by many US universities."""
        log("ApplyYourself portal detected")
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
