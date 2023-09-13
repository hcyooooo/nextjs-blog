// /graphql/types/Link.ts
import { builder } from "../builder";

builder.prismaObject("Link", {
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
    url: t.exposeString("url"),
    description: t.exposeString("description"),
    imageUrl: t.exposeString("imageUrl"),
    category: t.exposeString("category"),
    users: t.relation("users"),
  }),
});

export const LinkUniqueInput = builder.inputType("LinkUniqueInput", {
  fields: (t) => {
    return {
      title: t.string({ required: true }),
      description: t.string({ required: true }),
    };
  },
});

// query all links
builder.queryField("links", (t) =>
  t.prismaField({
    type: ["Link"],
    resolve: (query, _parent, _args, _ctx, _info) => {
      return prisma.link.findMany({ ...query });
    },
  })
);

// query single link
builder.queryField("link", (t) => {
  return t.prismaField({
    type: "Link",
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: (query, parent, args) => {
      return prisma.link.findUnique({
        where: {
          id: Number(args.id),
        },
      });
    },
  });
});

// add link
//tbd
builder.mutationField("addLink", (t) => {
  return t.prismaField({
    type: "Link",
    args: {
      data: t.arg({
        type: LinkUniqueInput,
        required: true,
      }),
    },
    resolve: (query, _parent, _args, _ctx, _info) => {
      return prisma.link.create({
        data: {
          title: _args.data.title,
          description: _args.data.description,
        },
      });
    },
  });
});
