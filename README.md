# PhD Applicant

**🌐 Live: [phd-applicant.vercel.app](https://phd-applicant.vercel.app)**

A full-stack web app to browse, track, and auto-submit PhD applications — built with Next.js, Prisma, and MongoDB. Includes a Playwright-powered automation service that fills and submits application portals on your behalf.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js) ![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb) ![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?logo=prisma) ![Python](https://img.shields.io/badge/Python-3.10+-blue?logo=python) ![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)

---

## Features

- **350+ PhD programs** across top US and international universities, pre-seeded and filterable by research area, country, funding, and deadline
- **Profile builder** — fill once, auto-filled into every application form
- **Document vault** — upload CV, transcripts, SOP, letters of recommendation, and test scores; stored persistently in MongoDB
- **Statements editor** — write and version your Statement of Purpose, personal statement, diversity essay, and research statement
- **Application tracker** — kanban-style status board (Saved → Submitted → Interview → Decision)
- **Auto-Apply engine** — Playwright automation that opens the portal, logs in, fills forms, uploads documents, and submits; supports ApplyYourself, CollegeNET, Slate, and generic portals
- **Demo mode** — simulates the full submission flow without Playwright when the automation service is offline

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15, React 19, Tailwind CSS, shadcn/ui |
| Database | MongoDB (via Docker) + Prisma ORM |
| Automation | Python, FastAPI, Playwright |
| File storage | Local filesystem (`public/docs/`) |

---

## Prerequisites

- Node.js 18+
- Docker (for MongoDB)
- Python 3.10+ (only for automation service)

---

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/centrixsol/phd-applicant.git
cd phd-applicant
npm install
```

### 2. Start MongoDB

```bash
docker run -d --name mongodb -p 27017:27017 mongo:latest mongod --replSet rs0
docker exec mongodb mongosh --eval 'rs.initiate({_id:"rs0",members:[{_id:0,host:"localhost:27017"}]})'
```

### 3. Configure environment

Copy `.env` and set your values:

```bash
cp .env .env.local
```

```env
DATABASE_URL="mongodb://localhost:27017/phd-applicant"
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"
UPLOAD_DIR="./public/docs"
AUTOMATION_SERVICE_URL="http://localhost:8000"
```

### 4. Set up the database

```bash
npm run db:push    # sync schema to MongoDB
npm run db:seed    # seed 350 PhD programs
```

### 5. Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Automation Service (optional)

The automation service uses Playwright to submit applications automatically.

```bash
cd automation
bash start.sh
```

This installs Python dependencies, Playwright browsers, and starts the FastAPI server on port 8000. Without it, the app runs in **Demo Mode** — all UI flows work but no real submission happens.

### Supported portals

| Portal | Universities |
|---|---|
| ApplyYourself | MIT, Stanford, Berkeley, Cornell, and many others |
| Slate | CMU, Northeastern, and others |
| CollegeNET | Illinois, Brown, and others |
| Custom/Generic | Oxford, ETH Zurich, Toronto, and all remaining |

---

## Application Flow

1. Browse programs → filter by area, country, funding
2. Save programs you're interested in
3. Complete your profile (used to auto-fill forms)
4. Upload required documents (CV, transcript, SOP, LOR)
5. Write your statements
6. Go to **Applications** → click **Auto-Apply**
7. Track status through to decision

---

## Database Commands

```bash
npm run db:push      # sync Prisma schema to MongoDB
npm run db:seed      # seed all programs (safe to re-run)
npm run db:reset     # force-reset + re-seed
npm run db:studio    # open Prisma Studio GUI
```

---

## Project Structure

```
phd-applicant/
├── src/
│   ├── app/
│   │   ├── api/           # Next.js API routes (profile, programs, documents, applications, statements)
│   │   ├── dashboard/     # Overview & stats
│   │   ├── programs/      # Browse & filter 350+ programs
│   │   ├── applications/  # Track saved applications
│   │   ├── documents/     # Upload & manage documents
│   │   ├── statements/    # Write SOP & essays
│   │   └── profile/       # Personal & academic info
│   ├── components/        # Reusable UI components (shadcn/ui)
│   └── lib/               # Prisma client, utilities
├── prisma/
│   ├── schema.prisma      # MongoDB schema
│   └── seed.ts            # 350 PhD programs seed data
├── automation/
│   ├── engine.py          # Playwright automation engine
│   ├── main.py            # FastAPI service
│   └── start.sh           # Setup & launch script
└── public/docs/           # Uploaded documents (gitignored)
```

---

## License

MIT
