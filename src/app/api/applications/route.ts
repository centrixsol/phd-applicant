import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const DEFAULT_EMAIL = process.env.USER_EMAIL || "babar-alii@outlook.com";

async function ensureUser() {
  return prisma.userProfile.upsert({
    where: { email: DEFAULT_EMAIL },
    update: {},
    create: { email: DEFAULT_EMAIL, firstName: "PhD", lastName: "Applicant" },
  });
}

export async function GET() {
  const user = await ensureUser();
  const applications = await prisma.application.findMany({
    where: { userId: user.id },
    include: { program: { include: { university: true } } },
    orderBy: [{ priority: "asc" }, { createdAt: "desc" }],
  });
  return NextResponse.json(
    applications.map((a) => ({
      ...a,
      program: { ...a.program, researchAreas: JSON.parse(a.program.researchAreas || "[]") },
    }))
  );
}

export async function POST(req: NextRequest) {
  const user = await ensureUser();
  const { programId, priority, notes } = await req.json();

  const existing = await prisma.application.findUnique({
    where: { userId_programId: { userId: user.id, programId } },
  });

  if (existing) {
    return NextResponse.json({ error: "Already saved" }, { status: 409 });
  }

  const app = await prisma.application.create({
    data: { userId: user.id, programId, priority: priority ?? 3, notes },
    include: { program: { include: { university: true } } },
  });

  return NextResponse.json({
    ...app,
    program: { ...app.program, researchAreas: JSON.parse(app.program.researchAreas || "[]") },
  });
}

export async function PUT(req: NextRequest) {
  const user = await ensureUser();
  const { id, status, notes, priority, portalUsername, portalPassword } = await req.json();

  const app = await prisma.application.updateMany({
    where: { id, userId: user.id },
    data: {
      ...(status && { status }),
      ...(notes !== undefined && { notes }),
      ...(priority && { priority }),
      ...(portalUsername && { portalUsername }),
      ...(portalPassword && { portalPassword }),
      ...(status === "submitted" && { submittedAt: new Date() }),
    },
  });

  return NextResponse.json(app);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const user = await ensureUser();
  await prisma.application.deleteMany({ where: { id, userId: user.id } });
  return NextResponse.json({ success: true });
}
