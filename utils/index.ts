const jwt = require("jsonwebtoken");
import { JWT_SECRET_KEY } from "../graphql/types/User";

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET_KEY);
  } catch (err) {
    return { error: true, msg: "token invalid" };
  }
}
