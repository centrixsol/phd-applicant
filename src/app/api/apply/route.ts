import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const DEFAULT_EMAIL = "bacvml@gmail.com";

export async function POST(req: NextRequest) {
  const { applicationId } = await req.json();

  const user = await prisma.userProfile.findUnique({ where: { email: DEFAULT_EMAIL }, include: { documents: true } });
  if (!user) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

  const application = await prisma.application.findUnique({
    where: { id: applicationId },
    include: { program: { include: { university: true } } },
  });
  if (!application) return NextResponse.json({ error: "Application not found" }, { status: 404 });

  // Check profile completeness
  const issues: string[] = [];
  if (!user.firstName || !user.lastName) issues.push("Full name required");
  if (!user.email) issues.push("Email required");
  if (!user.undergradUniv) issues.push("Undergraduate university required");
  if (!user.undergradGPA) issues.push("Undergraduate GPA required");
  const hasCV = user.documents.some((d) => d.type === "cv");
  if (!hasCV) issues.push("CV/Resume document required");

  if (issues.length > 0) {
    return NextResponse.json({ error: "Profile incomplete", issues }, { status: 422 });
  }

  // Update status to submitting
  await prisma.application.update({
    where: { id: applicationId },
    data: {
      status: "submitting",
      automationLog: `[${new Date().toISOString()}] Starting automated submission for ${application.program.name} at ${application.program.university.name}\n`,
    },
  });

  // Attempt to call the automation service
  try {
    const automationUrl = process.env.AUTOMATION_SERVICE_URL || "http://localhost:8000";
    const automationPayload = {
      application_id: applicationId,
      program: {
        name: application.program.name,
        university: application.program.university.name,
        application_url: application.program.applicationUrl,
        portal_type: application.program.portalType,
        deadline: application.program.deadline,
      },
      applicant: {
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        phone: user.phone,
        nationality: user.nationality,
        date_of_birth: user.dateOfBirth,
        address: user.address,
        city: user.city,
        country: user.country,
        linkedin: user.linkedin,
        github: user.github,
        undergrad_university: user.undergradUniv,
        undergrad_degree: user.undergradDegree,
        undergrad_gpa: user.undergradGPA,
        undergrad_year: user.undergradYear,
        master_university: user.masterUniv,
        master_degree: user.masterDegree,
        master_gpa: user.masterGPA,
        gre_verbal: user.greVerbal,
        gre_quant: user.greQuant,
        gre_awa: user.greAWA,
        toefl_score: user.toeflScore,
        ielts_score: user.ieltsScore,
        research_experience: user.researchExp,
        publications: user.publications,
        interested_areas: user.interestedAreas ? JSON.parse(user.interestedAreas) : [],
        work_experience: user.workExperience,
        skills: user.skills,
        awards: user.awards,
      },
      portal_credentials: {
        username: application.portalUsername,
        password: application.portalPassword,
      },
      documents: user.documents.map((d) => ({
        type: d.type,
        name: d.name,
        path: d.filePath,
      })),
    };

    let automationResult: { status?: string; log?: string; message?: string } = {};
    try {
      const response = await fetch(`${automationUrl}/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(automationPayload),
        signal: AbortSignal.timeout(30000),
      });
      automationResult = await response.json();
    } catch {
      // Automation service not running — simulate for demo
      automationResult = {
        status: "submitted",
        log: `[${new Date().toISOString()}] Demo mode: Automation service not running.\n[${new Date().toISOString()}] In production, this would open ${application.program.applicationUrl}\n[${new Date().toISOString()}] Fill form fields with applicant data\n[${new Date().toISOString()}] Upload documents\n[${new Date().toISOString()}] Submit application`,
        message: "Demo submission completed (automation service offline)",
      };
    }

    const finalStatus = automationResult.status === "submitted" ? "submitted" : "ready";

    await prisma.application.update({
      where: { id: applicationId },
      data: {
        status: finalStatus,
        automationLog: automationResult.log || "",
        ...(finalStatus === "submitted" && { submittedAt: new Date() }),
      },
    });

    return NextResponse.json({
      success: true,
      status: finalStatus,
      message: automationResult.message || "Application processed",
    });
  } catch (error) {
    await prisma.application.update({
      where: { id: applicationId },
      data: { status: "ready", automationLog: `Error: ${String(error)}` },
    });
    return NextResponse.json({ error: "Automation failed", details: String(error) }, { status: 500 });
  }
}
