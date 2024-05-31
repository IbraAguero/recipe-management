import { PrismaClient } from "@prisma/client";

/**
 * @type {PrismaClient}
 */
let prisma;

const prismaClientSingleton = () => {
  return new PrismaClient();
};

prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}

export default prisma;
