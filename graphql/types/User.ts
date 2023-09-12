// /graphql/types/User.ts
import { builder } from "../builder";

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
