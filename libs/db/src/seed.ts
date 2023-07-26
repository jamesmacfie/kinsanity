import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'james@macfie.co.nz';
  const name = 'James Macfie';
  const password = await hash('password123', 12);
  const user = await prisma.users.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name,
      password,
    },
  });
  console.log('Upserted user', { user });
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
