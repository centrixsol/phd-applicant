import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") ?? "";
  const area = searchParams.get("area") ?? "";
  const page = Math.max(1, Number(searchParams.get("page") ?? 1));
  const limit = Math.min(50, Number(searchParams.get("limit") ?? 24));
  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = {};

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { university: { contains: search, mode: "insensitive" } },
      { department: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  if (area) {
    where.researchAreas = { contains: area, mode: "insensitive" };
  }

  const [items, total] = await Promise.all([
    prisma.varbiPosition.findMany({
      where,
      skip,
      take: limit,
      orderBy: [{ qsRanking: "asc" }, { scrapedAt: "desc" }],
    }),
    prisma.varbiPosition.count({ where }),
  ]);

  const positions = items.map((p) => ({
    ...p,
    researchAreas: (() => { try { return JSON.parse(p.researchAreas); } catch { return []; } })(),
  }));

  return NextResponse.json({ positions, total, page, pages: Math.ceil(total / limit) });
}
