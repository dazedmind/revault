import { PrismaClient } from "@prisma/client";

// Remove any path references to src/generated/prisma

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;