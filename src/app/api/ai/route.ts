import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { prisma } from "@/lib/prisma";

const DEFAULT_EMAIL = process.env.USER_EMAIL || "babar-alii@outlook.com";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  const { action, programId, applicationId, question, customContext } = await req.json();

  const user = await prisma.userProfile.findUnique({
    where: { email: DEFAULT_EMAIL },
    include: { documents: true, statements: true },
  });

  if (!user) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

  let program = null;
  if (programId) {
    program = await prisma.program.findUnique({
      where: { id: programId },
      include: { university: true },
    });
  } else if (applicationId) {
    const app = await prisma.application.findUnique({
      where: { id: applicationId },
      include: { program: { include: { university: true } } },
    });
    program = app?.program ?? null;
  }

  const profileSummary = buildProfileSummary(user);
  const programSummary = program ? buildProgramSummary(program) : "";

  let prompt = "";
  let systemPrompt = "";

  switch (action) {
    case "motivation_letter":
      systemPrompt = `You are an expert academic writing assistant specializing in Swedish PhD applications.
You write compelling, authentic motivation letters tailored to specific positions.
Swedish PhD positions are employment contracts — frame the letter professionally.
Write in clear, concise academic English. Length: 500-700 words.`;
      prompt = `Write a compelling motivation letter for this PhD position:

${programSummary}

Applicant profile:
${profileSummary}

Guidelines:
- Open with genuine enthusiasm for the specific research area
- Connect applicant's background to the position's research focus
- Mention why this specific university/group appeals to them
- Highlight relevant experience and skills
- End with a strong closing statement
- Do NOT use generic phrases like "I am writing to apply..."
- Make it personal and specific to Sweden/Swedish research culture`;
      break;

    case "research_proposal":
      systemPrompt = `You are an expert in writing research proposals for PhD applications at Swedish universities.
Write clear, focused, and ambitious but realistic research proposals.
Length: 400-600 words. Include: background, research questions, methodology outline, expected contributions.`;
      prompt = `Write a research proposal outline for:

${programSummary}

Applicant's background and interests:
${profileSummary}

${customContext ? `Additional context: ${customContext}` : ""}

Structure the proposal with clear sections: Background, Research Questions, Methodology, Expected Contributions.`;
      break;

    case "answer_question":
      systemPrompt = `You are an expert at answering PhD application questions for Swedish universities.
Give concise, authentic, and compelling answers. Match the tone to the question type.
For factual questions: be direct. For essay questions: be reflective and specific.`;
      prompt = `Answer this application question for a Swedish PhD position:

Question: "${question}"

${programSummary ? `Program: ${programSummary}` : ""}

Applicant profile:
${profileSummary}

${customContext ? `Additional context: ${customContext}` : ""}

Provide a thoughtful, specific answer that demonstrates genuine fit and motivation.`;
      break;

    case "cover_email":
      systemPrompt = `You are an expert at writing professional cover emails for unsolicited PhD inquiries to Swedish professors.
Keep it concise (200-300 words), professional, and specific. Professors receive many generic emails — make this stand out.`;
      prompt = `Write a brief cover email to a professor at:

${programSummary}

From applicant:
${profileSummary}

The email should:
- Address the professor by title/name if known
- Mention a specific paper or research direction of theirs
- Briefly state the applicant's relevant background (2-3 sentences)
- Express interest in a PhD position
- Attach CV and ask about availability
- Be concise and professional`;
      break;

    case "improve_text":
      systemPrompt = `You are an expert academic editor. Improve the given text for a PhD application to a Swedish university.
Make it more compelling, specific, and professional while preserving the applicant's voice.`;
      prompt = `Improve this text for a PhD application:

"${customContext}"

Make it:
- More specific and compelling
- Free of vague or generic statements
- Professional but authentic
- Suitable for a Swedish academic context

Return only the improved text.`;
      break;

    default:
      return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  }

  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: "user", content: prompt }],
    });

    const text = message.content[0].type === "text" ? message.content[0].text : "";

    // Save motivation letter as a statement for reuse
    if (action === "motivation_letter" && program) {
      const title = `Motivation Letter — ${program.university.name}`;
      const existing = await prisma.statement.findFirst({
        where: { userId: user.id, title, type: "motivation_letter" },
      });
      if (existing) {
        await prisma.statement.update({
          where: { id: existing.id },
          data: { content: text, wordCount: text.split(/\s+/).length },
        });
      } else {
        await prisma.statement.create({
          data: {
            userId: user.id,
            type: "motivation_letter",
            title,
            content: text,
            wordCount: text.split(/\s+/).length,
            isDefault: false,
          },
        });
      }
    }

    return NextResponse.json({ text, action });
  } catch (error) {
    console.error("Claude API error:", error);
    return NextResponse.json({ error: "AI generation failed", details: String(error) }, { status: 500 });
  }
}

function buildProfileSummary(user: {
  firstName: string;
  lastName: string;
  email: string;
  nationality?: string | null;
  undergradUniv?: string | null;
  undergradDegree?: string | null;
  undergradGPA?: number | null;
  undergradYear?: number | null;
  masterUniv?: string | null;
  masterDegree?: string | null;
  masterGPA?: number | null;
  masterYear?: number | null;
  researchExp?: string | null;
  publications?: string | null;
  interestedAreas?: string | null;
  workExperience?: string | null;
  skills?: string | null;
  awards?: string | null;
  toeflScore?: number | null;
  ieltsScore?: number | null;
}) {
  const areas = user.interestedAreas ? JSON.parse(user.interestedAreas) : [];
  return `Name: ${user.firstName} ${user.lastName}
Nationality: ${user.nationality || "Not specified"}
Education:
  - BSc: ${user.undergradDegree || "N/A"} at ${user.undergradUniv || "N/A"} (${user.undergradYear || "N/A"}, GPA: ${user.undergradGPA || "N/A"})
  ${user.masterUniv ? `- MSc: ${user.masterDegree || "MSc"} at ${user.masterUniv} (${user.masterYear || "N/A"}, GPA: ${user.masterGPA || "N/A"})` : ""}
Research Experience: ${user.researchExp || "Not specified"}
Publications: ${user.publications || "None listed"}
Research Interests: ${areas.join(", ") || "Not specified"}
Skills: ${user.skills || "Not specified"}
Awards: ${user.awards || "None listed"}
Work Experience: ${user.workExperience || "None listed"}
Language: TOEFL ${user.toeflScore || "N/A"} | IELTS ${user.ieltsScore || "N/A"}`;
}

function buildProgramSummary(program: {
  name: string;
  department: string;
  description?: string | null;
  researchAreas: string;
  stipendUSD?: number | null;
  deadline: string;
  university: { name: string; city: string; country: string; qsRanking?: number | null };
}) {
  const areas = JSON.parse(program.researchAreas || "[]");
  return `University: ${program.university.name} (QS #${program.university.qsRanking || "N/A"})
Location: ${program.university.city}, ${program.university.country}
Program: ${program.name}
Department: ${program.department}
Research Areas: ${areas.join(", ")}
Funding: Fully employed, ~${program.stipendUSD ? `$${program.stipendUSD.toLocaleString()}/yr` : "competitive stipend"}
Deadline: ${program.deadline}
${program.description ? `Description: ${program.description}` : ""}`;
}
