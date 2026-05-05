import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const DEFAULT_EMAIL = "bacvml@gmail.com";

export async function GET() {
  const user = await prisma.userProfile.findUnique({
    where: { email: DEFAULT_EMAIL },
    include: { documents: true, applications: true, statements: true },
  });

  const totalPrograms = await prisma.program.count({ where: { fullyFunded: true } });
  const totalUniversities = await prisma.university.count();

  if (!user) {
    return NextResponse.json({
      totalPrograms,
      totalUniversities,
      savedApplications: 0,
      submittedApplications: 0,
      acceptedApplications: 0,
      documentsUploaded: 0,
      statementsWritten: 0,
      profileComplete: 0,
    });
  }

  const profileFields = [
    user.firstName, user.lastName, user.email, user.phone, user.nationality,
    user.undergradUniv, user.undergradGPA, user.researchExp, user.interestedAreas,
  ];
  const filled = profileFields.filter(Boolean).length;
  const profileComplete = Math.round((filled / profileFields.length) * 100);

  return NextResponse.json({
    totalPrograms,
    totalUniversities,
    savedApplications: user.applications.length,
    submittedApplications: user.applications.filter((a) => ["submitted", "pending", "interview", "accepted"].includes(a.status)).length,
    acceptedApplications: user.applications.filter((a) => a.status === "accepted").length,
    documentsUploaded: user.documents.length,
    statementsWritten: user.statements.length,
    profileComplete,
    applicationsByStatus: user.applications.reduce((acc, a) => {
      acc[a.status] = (acc[a.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
  });
}
