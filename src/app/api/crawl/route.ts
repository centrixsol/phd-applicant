import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const AUTOMATION_URL = process.env.AUTOMATION_SERVICE_URL || "http://localhost:8000";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const maxUniversities = Number(body.maxUniversities ?? 14);

  try {
    const res = await fetch(`${AUTOMATION_URL}/crawl?max_universities=${maxUniversities}`, {
      method: "POST",
      signal: AbortSignal.timeout(300_000), // 5 min timeout
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ error: `Crawler returned ${res.status}`, detail: err }, { status: 502 });
    }

    const data = await res.json();
    const positions: VarbiPositionRaw[] = data.positions ?? [];

    // Upsert all positions into DB
    let saved = 0;
    for (const p of positions) {
      await prisma.varbiPosition.upsert({
        where: { universityCode_jobId: { universityCode: p.universityCode, jobId: p.jobId } },
        update: {
          title: p.title,
          university: p.university,
          city: p.city,
          qsRanking: p.qsRanking ?? null,
          applicationUrl: p.applicationUrl,
          deadline: p.deadline ?? null,
          description: p.description ?? null,
          department: p.department ?? null,
          researchAreas: JSON.stringify(p.researchAreas ?? []),
          stipendUSD: p.stipendUSD ?? null,
          scrapedAt: new Date(),
        },
        create: {
          jobId: p.jobId,
          universityCode: p.universityCode,
          title: p.title,
          university: p.university,
          city: p.city,
          qsRanking: p.qsRanking ?? null,
          applicationUrl: p.applicationUrl,
          deadline: p.deadline ?? null,
          description: p.description ?? null,
          department: p.department ?? null,
          researchAreas: JSON.stringify(p.researchAreas ?? []),
          stipendUSD: p.stipendUSD ?? null,
        },
      });
      saved++;
    }

    return NextResponse.json({
      status: "ok",
      found: positions.length,
      saved,
      log: data.log ?? "",
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    if (msg.includes("ECONNREFUSED") || msg.includes("fetch failed")) {
      return NextResponse.json(
        { error: "Automation service not running. Start it with: cd automation && python main.py" },
        { status: 503 }
      );
    }
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function GET() {
  const count = await prisma.varbiPosition.count();
  const latest = await prisma.varbiPosition.findFirst({ orderBy: { scrapedAt: "desc" } });
  return NextResponse.json({ count, lastScraped: latest?.scrapedAt ?? null });
}

interface VarbiPositionRaw {
  jobId: string;
  universityCode: string;
  title: string;
  university: string;
  city: string;
  qsRanking?: number;
  applicationUrl: string;
  deadline?: string;
  description?: string;
  department?: string;
  researchAreas?: string[];
  stipendUSD?: number;
}
