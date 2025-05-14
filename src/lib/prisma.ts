import { PrismaClient } from "@prisma/client";
import { withAccelerate } from '@prisma/extension-accelerate'

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof prismaWithExtensions> | undefined;
};

const prismaWithExtensions = () => {
  return new PrismaClient({
    log: ["query"],
  }).$extends(withAccelerate());
};

export const prisma = globalForPrisma.prisma ?? prismaWithExtensions();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// // src/lib/prisma.ts
// import { PrismaClient } from "@prisma/client";

// // This prevents multiple instances of Prisma Client in development
// declare global {
//   var prisma: PrismaClient | undefined;
// }

// export const prisma = global.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== "production") global.prisma = prisma;