import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from '@prisma/extension-accelerate';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more: 
// https://pris.ly/d/help/next-js-best-practices

const _extendedPrismaClient = new PrismaClient().$extends(withAccelerate())
type ExtendedPrismaClient = typeof _extendedPrismaClient

let prisma: ExtendedPrismaClient


if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient().$extends(withAccelerate())
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient().$extends(withAccelerate())
  }
  prisma = global.prisma
}


export default prisma