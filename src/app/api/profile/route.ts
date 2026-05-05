import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const DEFAULT_EMAIL = "bacvml@gmail.com";

export async function GET() {
  let profile = await prisma.userProfile.findUnique({ where: { email: DEFAULT_EMAIL } });
  if (!profile) {
    profile = await prisma.userProfile.create({
      data: { email: DEFAULT_EMAIL, firstName: "PhD", lastName: "Applicant" },
    });
  }
  return NextResponse.json({
    ...profile,
    interestedAreas: profile.interestedAreas ? JSON.parse(profile.interestedAreas) : [],
  });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { interestedAreas, ...rest } = body;

  const profile = await prisma.userProfile.upsert({
    where: { email: DEFAULT_EMAIL },
    update: {
      ...rest,
      interestedAreas: interestedAreas ? JSON.stringify(interestedAreas) : undefined,
    },
    create: {
      email: DEFAULT_EMAIL,
      firstName: rest.firstName || "PhD",
      lastName: rest.lastName || "Applicant",
      ...rest,
      interestedAreas: interestedAreas ? JSON.stringify(interestedAreas) : undefined,
    },
  });

  return NextResponse.json({ ...profile, interestedAreas: interestedAreas || [] });
}
