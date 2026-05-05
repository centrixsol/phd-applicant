#!/usr/bin/env tsx
import { Command } from "commander";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const program = new Command();

program
  .name("phd")
  .description("PhD Applicant CLI — manage programs, applications, and profile from the terminal")
  .version("1.0.0");

// ─── PROGRAMS ────────────────────────────────────────────────────────────────

const programs = program.command("programs").description("Browse PhD programs");

programs
  .command("list")
  .description("List all programs")
  .option("-a, --area <area>", "filter by research area")
  .option("-c, --country <country>", "filter by country")
  .option("-n, --limit <n>", "max results", "20")
  .action(async (opts) => {
    const rows = await prisma.program.findMany({
      include: { university: true },
      take: parseInt(opts.limit),
      orderBy: { university: { qsRanking: "asc" } },
    });

    const filtered = rows.filter((p) => {
      const areas: string[] = JSON.parse(p.researchAreas || "[]");
      if (opts.area && !areas.some((a) => a.toLowerCase().includes(opts.area.toLowerCase()))) return false;
      if (opts.country && !p.university.country.toLowerCase().includes(opts.country.toLowerCase())) return false;
      return true;
    });

    console.log(`\n${"─".repeat(90)}`);
    console.log(
      `${"ID".padEnd(28)} ${"University".padEnd(30)} ${"Program".padEnd(35)} Stipend`
    );
    console.log("─".repeat(90));
    for (const p of filtered) {
      const stipend = p.stipendUSD ? `$${p.stipendUSD.toLocaleString()}` : "N/A";
      console.log(
        `${p.id.padEnd(28)} ${p.university.name.substring(0, 28).padEnd(30)} ${p.name.substring(0, 33).padEnd(35)} ${stipend}`
      );
    }
    console.log(`─`.repeat(90));
    console.log(`  ${filtered.length} programs\n`);
    await prisma.$disconnect();
  });

programs
  .command("search <query>")
  .description("Search programs by name, department, or research area")
  .action(async (query) => {
    const rows = await prisma.program.findMany({
      include: { university: true },
      orderBy: { university: { qsRanking: "asc" } },
    });

    const q = query.toLowerCase();
    const matches = rows.filter((p) => {
      const areas: string[] = JSON.parse(p.researchAreas || "[]");
      return (
        p.name.toLowerCase().includes(q) ||
        p.department.toLowerCase().includes(q) ||
        p.university.name.toLowerCase().includes(q) ||
        areas.some((a) => a.toLowerCase().includes(q))
      );
    });

    console.log(`\nSearch: "${query}" — ${matches.length} results\n`);
    for (const p of matches) {
      const areas: string[] = JSON.parse(p.researchAreas || "[]");
      console.log(`  ${p.id}  ${p.university.name} — ${p.name}`);
      console.log(`     Areas: ${areas.slice(0, 3).join(", ")}  |  Deadline: ${p.deadline}  |  Stipend: $${p.stipendUSD?.toLocaleString() ?? "N/A"}`);
      console.log();
    }
    await prisma.$disconnect();
  });

programs
  .command("show <id>")
  .description("Show full details for a program")
  .action(async (id) => {
    const p = await prisma.program.findUnique({
      where: { id },
      include: { university: true },
    });
    if (!p) { console.error(`Program not found: ${id}`); process.exit(1); }
    const areas: string[] = JSON.parse(p.researchAreas || "[]");
    console.log(`\n${"═".repeat(60)}`);
    console.log(`  ${p.name}`);
    console.log(`  ${p.university.name} · ${p.university.city}, ${p.university.country}`);
    console.log(`${"═".repeat(60)}`);
    console.log(`  Department:  ${p.department}`);
    console.log(`  Degree:      ${p.degree}`);
    console.log(`  Duration:    ${p.duration}`);
    console.log(`  Stipend:     $${p.stipendUSD?.toLocaleString() ?? "N/A"}/yr`);
    console.log(`  Deadline:    ${p.deadline}`);
    console.log(`  GRE:         ${p.greRequired ? "Required" : "Not required"}`);
    console.log(`  TOEFL min:   ${p.toeflMin ?? "N/A"}`);
    console.log(`  Portal:      ${p.portalType ?? "Custom"}`);
    console.log(`  URL:         ${p.applicationUrl}`);
    console.log(`  Areas:       ${areas.join(", ")}`);
    if (p.notableFaculty) console.log(`  Faculty:     ${p.notableFaculty}`);
    if (p.description) console.log(`\n  ${p.description}`);
    console.log();
    await prisma.$disconnect();
  });

// ─── APPLICATIONS ────────────────────────────────────────────────────────────

const DEFAULT_EMAIL = "bacvml@gmail.com";

async function ensureUser() {
  return prisma.userProfile.upsert({
    where: { email: DEFAULT_EMAIL },
    update: {},
    create: { email: DEFAULT_EMAIL, firstName: "PhD", lastName: "Applicant" },
  });
}

const apps = program.command("applications").alias("apps").description("Manage your applications");

apps
  .command("list")
  .description("List all saved applications")
  .option("-s, --status <status>", "filter by status")
  .action(async (opts) => {
    const user = await ensureUser();
    const list = await prisma.application.findMany({
      where: { userId: user.id, ...(opts.status && { status: opts.status }) },
      include: { program: { include: { university: true } } },
      orderBy: [{ priority: "asc" }, { createdAt: "desc" }],
    });

    const statusIcon: Record<string, string> = {
      saved: "🔖", ready: "✅", submitting: "⏳", submitted: "📤",
      pending: "⏰", interview: "🎙️", accepted: "🎉", rejected: "❌", withdrawn: "↩️",
    };

    console.log(`\n  Your Applications (${list.length})\n`);
    for (const a of list) {
      const icon = statusIcon[a.status] ?? "•";
      const p = a.program;
      console.log(`  ${icon} [${a.status.toUpperCase().padEnd(11)}] ${p.university.name} — ${p.name}`);
      console.log(`     ID: ${a.id}  |  Deadline: ${p.deadline}  |  Priority: ${a.priority}`);
      if (a.notes) console.log(`     Notes: ${a.notes}`);
      console.log();
    }
    await prisma.$disconnect();
  });

apps
  .command("add <programId>")
  .description("Save a program to your applications")
  .option("-p, --priority <n>", "priority 1=high 2=medium 3=low", "3")
  .option("-n, --notes <text>", "notes")
  .action(async (programId, opts) => {
    const user = await ensureUser();
    const prog = await prisma.program.findUnique({ where: { id: programId }, include: { university: true } });
    if (!prog) { console.error(`Program not found: ${programId}`); process.exit(1); }

    try {
      const app = await prisma.application.create({
        data: { userId: user.id, programId, priority: parseInt(opts.priority), notes: opts.notes },
      });
      console.log(`\n  ✅ Saved: ${prog.university.name} — ${prog.name}`);
      console.log(`     Application ID: ${app.id}\n`);
    } catch {
      console.error("  Already in your applications.");
    }
    await prisma.$disconnect();
  });

apps
  .command("status <id> <status>")
  .description("Update application status (saved|ready|submitting|submitted|pending|interview|accepted|rejected|withdrawn)")
  .action(async (id, status) => {
    const user = await ensureUser();
    const valid = ["saved","ready","submitting","submitted","pending","interview","accepted","rejected","withdrawn"];
    if (!valid.includes(status)) {
      console.error(`  Invalid status. Choose: ${valid.join(", ")}`);
      process.exit(1);
    }
    await prisma.application.updateMany({
      where: { id, userId: user.id },
      data: { status, ...(status === "submitted" && { submittedAt: new Date() }) },
    });
    console.log(`\n  ✅ Status updated to: ${status}\n`);
    await prisma.$disconnect();
  });

apps
  .command("remove <id>")
  .description("Remove an application")
  .action(async (id) => {
    const user = await ensureUser();
    await prisma.application.deleteMany({ where: { id, userId: user.id } });
    console.log(`\n  ✅ Application removed\n`);
    await prisma.$disconnect();
  });

// ─── PROFILE ─────────────────────────────────────────────────────────────────

program
  .command("profile")
  .description("Show your profile")
  .action(async () => {
    const user = await ensureUser();
    const p = await prisma.userProfile.findUnique({ where: { id: user.id } });
    if (!p) { console.log("No profile found."); process.exit(0); }
    const areas: string[] = p.interestedAreas ? JSON.parse(p.interestedAreas) : [];
    console.log(`\n${"═".repeat(50)}`);
    console.log(`  ${p.firstName} ${p.lastName}  <${p.email}>`);
    console.log(`${"═".repeat(50)}`);
    if (p.nationality) console.log(`  Nationality:  ${p.nationality}`);
    if (p.undergradUniv) console.log(`  Undergrad:    ${p.undergradUniv} (GPA ${p.undergradGPA ?? "N/A"})`);
    if (p.masterUniv)    console.log(`  Masters:      ${p.masterUniv} (GPA ${p.masterGPA ?? "N/A"})`);
    if (p.greVerbal)     console.log(`  GRE:          V${p.greVerbal} Q${p.greQuant} AW${p.greAWA}`);
    if (p.toeflScore)    console.log(`  TOEFL:        ${p.toeflScore}`);
    if (areas.length)    console.log(`  Interests:    ${areas.join(", ")}`);
    console.log();
    await prisma.$disconnect();
  });

// ─── STATS ───────────────────────────────────────────────────────────────────

program
  .command("stats")
  .description("Show application statistics")
  .action(async () => {
    const user = await ensureUser();
    const [total, byStatus, programCount, docCount] = await Promise.all([
      prisma.application.count({ where: { userId: user.id } }),
      prisma.application.groupBy({ by: ["status"], where: { userId: user.id }, _count: true }),
      prisma.program.count(),
      prisma.document.count({ where: { userId: user.id } }),
    ]);

    const statusIcon: Record<string, string> = {
      saved: "🔖", ready: "✅", submitted: "📤", interview: "🎙️",
      accepted: "🎉", rejected: "❌", withdrawn: "↩️", pending: "⏰",
    };

    console.log(`\n  ── PhD Applicant Stats ──────────────────`);
    console.log(`  Total programs in DB:  ${programCount}`);
    console.log(`  Your applications:     ${total}`);
    console.log(`  Documents uploaded:    ${docCount}`);
    console.log(`\n  By status:`);
    for (const s of byStatus) {
      const icon = statusIcon[s.status] ?? "•";
      console.log(`    ${icon}  ${s.status.padEnd(14)} ${s._count}`);
    }
    console.log();
    await prisma.$disconnect();
  });

// ─── DB ──────────────────────────────────────────────────────────────────────

const db = program.command("db").description("Database utilities");

db.command("seed")
  .description("Seed the database with all PhD programs")
  .action(async () => {
    console.log("Running seed...");
    const { execSync } = await import("child_process");
    execSync("npm run db:seed", { stdio: "inherit", cwd: process.cwd() });
  });

db.command("stats")
  .description("Show database collection counts")
  .action(async () => {
    const [unis, progs, users, docs, stmts, appsCount] = await Promise.all([
      prisma.university.count(),
      prisma.program.count(),
      prisma.userProfile.count(),
      prisma.document.count(),
      prisma.statement.count(),
      prisma.application.count(),
    ]);
    console.log(`\n  MongoDB — phd-applicant`);
    console.log(`  Universities:  ${unis}`);
    console.log(`  Programs:      ${progs}`);
    console.log(`  Users:         ${users}`);
    console.log(`  Documents:     ${docs}`);
    console.log(`  Statements:    ${stmts}`);
    console.log(`  Applications:  ${appsCount}\n`);
    await prisma.$disconnect();
  });

program.parseAsync(process.argv).catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
