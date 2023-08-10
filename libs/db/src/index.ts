import { kafka } from '@kafka';
import * as Prisma from '@prisma/client';

export const basePrisma = new Prisma.PrismaClient();
export const prisma = basePrisma.$extends({
  query: {
    events: {
      async create({ args, query }) {
        const p = kafka.producer();
        const record = await query(args);
        return p.produce('event_create', record);
      },
    },
  },
});
export default Prisma;
