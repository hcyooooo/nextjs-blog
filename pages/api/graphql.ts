// pages/api/graphql.ts

import { createYoga } from "graphql-yoga";
import type { NextApiRequest, NextApiResponse } from "next";
import { schema } from "../../graphql/schema";
import { verifyToken } from "@/utils";

export default createYoga<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  schema,
  graphqlEndpoint: "/api/graphql",
  context: ({ req }) => {
    if (req.headers && req.headers.authorization) {
      const auth = req.headers.authorization;
      const parts = auth.split(" ");
      const bearer = parts[0];
      const token = parts[1];
      if (bearer === "Bearer") {
        const user = verifyToken(token);
        if (user.error) {
          throw Error(user.msg);
        } else return { user };
      } else {
        throw Error("Authentication must use Bearer.");
      }
    }
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};
