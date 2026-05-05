import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

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
  const documents = await prisma.document.findMany({
    where: { userId: user.id },
    orderBy: { uploadedAt: "desc" },
  });
  return NextResponse.json(documents);
}

export async function POST(req: NextRequest) {
  const user = await ensureUser();
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const type = formData.get("type") as string;
  const name = formData.get("name") as string;

  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const uploadDir = path.join(process.cwd(), "public", "docs", user.id);
  await mkdir(uploadDir, { recursive: true });

  const ext = path.extname(file.name);
  const fileName = `${type}-${Date.now()}${ext}`;
  const filePath = path.join(uploadDir, fileName);
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filePath, buffer);

  const doc = await prisma.document.create({
    data: {
      userId: user.id,
      type,
      name: name || file.name,
      fileName,
      filePath: `/docs/${user.id}/${fileName}`,
      fileSize: file.size,
      mimeType: file.type,
    },
  });

  return NextResponse.json(doc);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const user = await ensureUser();
  await prisma.document.deleteMany({ where: { id, userId: user.id } });
  return NextResponse.json({ success: true });
}
