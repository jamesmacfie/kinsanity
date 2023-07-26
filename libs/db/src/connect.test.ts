import { prisma } from '.';

describe('Prisma Database Connection', () => {
  it('should connect to the database', async () => {
    try {
      await prisma.$connect();
      await prisma.$disconnect();
    } catch (error) {
      throw new Error('Could not connect to the database.');
    }
  });
});
