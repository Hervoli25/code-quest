// Code written and maintained by Elisee Kajingu
// Prisma Client for Neon Database

import { PrismaClient } from '@prisma/client';

// Create a singleton instance of Prisma Client
const globalForPrisma = globalThis;

export const prisma = globalForPrisma.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;

