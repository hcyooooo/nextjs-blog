// /graphql/types/User.ts
import { builder } from "../builder";
import { encrypt, decrypt } from "../../utils";
const JWT_SECRET_KEY = "hcyoooo"; // 准备 JWT 的密钥

var jwt = require("jsonwebtoken");

builder.prismaObject("User", {
  fields: (t) => ({
    id: t.exposeID("id"),
    email: t.exposeString("email", { nullable: true }),
    image: t.exposeString("image", { nullable: true }),
    role: t.expose("role", { type: Role }),
    bookmarks: t.relation("bookmarks"),
  }),
});

const Role = builder.enumType("Role", {
  values: ["USER", "ADMIN"] as const,
});

builder.queryField("users", (t) =>
  t.prismaField({
    type: ["User"],
    resolve: (query) => {
      return prisma.user.findMany({ ...query });
    },
  })
);

// add user
builder.mutationField("addUser", (t) =>
  t.prismaField({
    type: "User",
    args: {
      email: t.arg.string({ required: true }),
    },
    //@ts-ignore
    resolve: (query, _parent, args) => {
      return prisma.user.create({
        data: { email: args.email },
      });
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
      try {
        let user = prisma.user.findUniqueOrThrow({
          where: { email, password },
        });
        if (!user) {
          throw new Error("邮箱不存在或者密码错误");
        }
        // 1.生成 token
        const token = jwt.sign(
          {
            password,
          },
          JWT_SECRET_KEY,
          {
            expiresIn: 60 * 60 * 24 * 30, // token 的有效期为 30 天
          }
        );

        return await prisma.user.update({
          where: { email },
          data: { token },
        });
      } catch (error) {}
    },
  })
);

//register
builder.mutationField("register", (t) =>
  t.prismaField({
    type: "User",
    args: {
      email: t.arg.string({ required: true }),
      password: t.arg.string({ required: true }),
    },
    resolve: async (query, parent, args) => {
      const { email, password } = args;
      try {
        return await prisma.user.create({
          data: {
            email,
            password: encrypt(password),
          },
        });
      } catch (error) {}
    },
  })
);
