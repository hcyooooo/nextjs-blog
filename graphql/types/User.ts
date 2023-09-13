// /graphql/types/User.ts
import { builder } from "../builder";
const bcrypt = require("bcrypt");
export const JWT_SECRET_KEY = "hcyoooo"; // JWT 的密钥

var jwt = require("jsonwebtoken");

builder.prismaObject("User", {
  fields: (t) => ({
    id: t.exposeID("id"),
    email: t.exposeString("email", { nullable: true }),
    image: t.exposeString("image", { nullable: true }),
    role: t.expose("role", { type: Role }),
    bookmarks: t.relation("bookmarks"),
    token: t.exposeString("token", { nullable: true }),
  }),
});

const Role = builder.enumType("Role", {
  values: ["USER", "ADMIN"] as const,
});

// all users
builder.queryField("users", (t) =>
  t.prismaField({
    type: ["User"],
    resolve: (query) => {
      return prisma.user.findMany({ ...query });
    },
  })
);

//log in
builder.mutationField("login", (t) =>
  t.prismaField({
    type: "User",
    args: {
      email: t.arg.string({ required: true }),
      password: t.arg.string({ required: true }),
    },
    resolve: async (query, parent, args) => {
      const { email, password } = args;
      const user = await prisma.user.findUnique({
        where: { email },
      });
      if (!user) {
        throw new Error("user not found");
      }
      const passwordValid = await bcrypt.compare(password, user.password);
      if (!passwordValid) {
        throw new Error("password not valid");
      }
      const token = jwt.sign(
        {
          id: user.id,
        },
        JWT_SECRET_KEY,
        {
          expiresIn: 60 * 60 * 24 * 30, // token 的有效期为 30 天
        }
      );
      return { ...user, token };
    },
  })
);

//sign up
builder.mutationField("signup", (t) =>
  t.prismaField({
    type: "User",
    args: {
      email: t.arg.string({ required: true }),
      password: t.arg.string({ required: true }),
    },
    resolve: async (query, parent, args) => {
      const { email, password } = args;
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        throw new Error("user already exists");
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      return await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });
    },
  })
);

//me
builder.queryField("me", (t) =>
  t.prismaField({
    type: "User",
    resolve: (query, _parent, _args, _ctx, _info) => {
      return prisma.user.findUnique({
        where: {
          id: _ctx.user.id,
        },
        select: {
          email: true,
        },
      });
    },
  })
);
