// graphql/builder.ts

// 1.
import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import type PrismaTypes from "@pothos/plugin-prisma/generated";
import prisma from "../lib/prisma";

// 2. 创建一个新的 SchemaBuilder 实例
export const builder = new SchemaBuilder<{
  // 3. 定义将用于创建 GraphQL schema的静态类型
  PrismaTypes: PrismaTypes;
}>({
  // 4. 定义 SchemaBuilder 的选项，例如要使用的插件 和 Prisma 客户端实例
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma,
  },
});

builder.queryType({});
builder.mutationType({});
