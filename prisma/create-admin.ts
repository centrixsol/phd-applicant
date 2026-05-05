import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
const EMAIL = "bacvml@gmail.com";

async function main() {
  const password = process.argv[2] || process.env.ADMIN_PASSWORD;
  if (!password) {
    console.error("Usage: tsx prisma/create-admin.ts <password>");
    console.error("   or: ADMIN_PASSWORD=... tsx prisma/create-admin.ts");
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.userProfile.upsert({
    where: { email: EMAIL },
    update: { passwordHash },
    create: { email: EMAIL, firstName: "PhD", lastName: "Applicant", passwordHash },
  });

  console.log(`✅ User ${EMAIL} created/updated in database`);
}

main().finally(() => prisma.$disconnect());
