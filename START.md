# PhD Apply — Quick Start

## Start the App

```bash
cd /Users/mod/phd-applicant
npm run dev
```

Open: http://localhost:3000

## Start the Automation Service (optional, for auto-apply)

```bash
cd /Users/mod/phd-applicant/automation
bash start.sh
```

## Database Commands

```bash
# Reset and re-seed all 500+ programs
npm run db:reset

# Open Prisma Studio (database GUI)
npm run db:studio
```

## App Structure

- `/` — Landing page
- `/dashboard` — Overview & stats
- `/programs` — Browse 502 PhD programs (filter by country, research area)
- `/programs/[id]` — Program detail + save/apply
- `/profile` — Fill your profile (auto-fills application forms)
- `/documents` — Upload CV, transcripts, SOP, etc.
- `/statements` — Write Statement of Purpose & other essays
- `/applications` — Track saved programs + hit Auto-Apply

## Auto-Apply Flow

1. Browse programs → Save to applications
2. Complete your profile (all fields)
3. Upload required documents (CV, transcript, SOP)
4. Write statements
5. Go to Applications → click "Auto-Apply"
6. The system calls the automation service which opens the portal, fills forms, uploads docs
7. Track status: Submitting → Submitted → Under Review → Interview → Decision

## Supported Portal Types

- **ApplyYourself** (MIT, Stanford, Berkeley, Cornell, etc.)
- **Slate** (CMU, Northeastern, etc.)
- **CollegeNET** (Illinois, Brown, etc.)
- **Custom** (Oxford, ETH, Toronto, and all others)

## Demo Mode

If the automation service is not running, clicking "Auto-Apply" runs in Demo Mode:
it simulates the submission flow and marks the application as submitted so you can
explore the full UX without Playwright running.
