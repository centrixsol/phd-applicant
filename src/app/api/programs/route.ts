import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const country = searchParams.get("country") || "";
  const area = searchParams.get("area") || "";
  const maxDeadline = searchParams.get("maxDeadline") || "";
  const minStipend = parseInt(searchParams.get("minStipend") || "0");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = {
    fullyFunded: true,
  };

  if (search) {
    where.OR = [
      { name: { contains: search } },
      { department: { contains: search } },
      { university: { is: { name: { contains: search } } } },
      { researchAreas: { contains: search } },
    ];
  }

  if (country) {
    where.university = { is: { country: { contains: country } } };
  }

  if (area) {
    where.researchAreas = { contains: area };
  }

  if (minStipend > 0) {
    where.stipendUSD = { gte: minStipend };
  }

  const [programs, total] = await Promise.all([
    prisma.program.findMany({
      where,
      include: { university: true },
      orderBy: [{ university: { qsRanking: "asc" } }, { stipendUSD: "desc" }],
      skip,
      take: limit,
    }),
    prisma.program.count({ where }),
  ]);

  return NextResponse.json({
    programs: programs.map((p) => ({
      ...p,
      researchAreas: JSON.parse(p.researchAreas || "[]"),
    })),
    total,
    page,
    pages: Math.ceil(total / limit),
  });
}
