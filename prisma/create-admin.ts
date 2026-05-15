import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.argv[2] || process.env.USER_EMAIL || process.env.PORTAL_USERNAME;
  const password = process.argv[3] || process.env.PORTAL_PASSWORD || process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error("Usage: tsx prisma/create-admin.ts <email> <password>");
    console.error("   or: set USER_EMAIL and PORTAL_PASSWORD in .env");
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.userProfile.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, firstName: "Babar", lastName: "Ali", passwordHash },
  });

  console.log(`✅ User ${user.email} (id: ${user.id}) created/updated in database`);
}

main().finally(() => prisma.$disconnect());
