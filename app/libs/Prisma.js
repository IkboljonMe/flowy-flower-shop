import { PrismaClient } from '@prisma/client'

// Reuse one client (Next.js dev hot reload would otherwise create many)
const globalForPrisma = globalThis
const prisma = globalForPrisma.prisma || new PrismaClient()
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma;
