import { PrismaClient, Prisma } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
    globalForPrisma.prisma || new PrismaClient({ log: ['query'] });

if (process.env.WORKING_ENV === 'PROD') globalForPrisma.prisma = prisma;
