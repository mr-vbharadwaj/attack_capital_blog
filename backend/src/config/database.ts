import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('Database Connected');
  } catch (error) {
    console.error('Error connecting to database:', error);
    process.exit(1);
  }
};

export default prisma;