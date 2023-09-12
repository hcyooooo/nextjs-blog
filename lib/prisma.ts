// /lib/prisma.ts
import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

declare global {
  var prisma: PrismaClient;
}

// 不是生产环境，则会添加到全局，不会耗尽数据库连接限制
//https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}
export default prisma