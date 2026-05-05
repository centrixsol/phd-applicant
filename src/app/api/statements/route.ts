import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const DEFAULT_EMAIL = "bacvml@gmail.com";

async function ensureUser() {
  return prisma.userProfile.upsert({
    where: { email: DEFAULT_EMAIL },
    update: {},
    create: { email: DEFAULT_EMAIL, firstName: "PhD", lastName: "Applicant" },
  });
}

export async function GET() {
  const user = await ensureUser();
  const statements = await prisma.statement.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(statements);
}

export async function POST(req: NextRequest) {
  const user = await ensureUser();
  const body = await req.json();
  const { type, title, content } = body;
  const wordCount = content?.trim().split(/\s+/).filter(Boolean).length || 0;
  const stmt = await prisma.statement.create({
    data: { userId: user.id, type, title, content, wordCount },
  });
  return NextResponse.json(stmt);
}

export async function PUT(req: NextRequest) {
  const user = await ensureUser();
  const body = await req.json();
  const { id, type, title, content } = body;
  const wordCount = content?.trim().split(/\s+/).filter(Boolean).length || 0;
  const stmt = await prisma.statement.updateMany({
    where: { id, userId: user.id },
    data: { type, title, content, wordCount },
  });
  return NextResponse.json(stmt);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const user = await ensureUser();
  await prisma.statement.deleteMany({ where: { id, userId: user.id } });
  return NextResponse.json({ success: true });
}
