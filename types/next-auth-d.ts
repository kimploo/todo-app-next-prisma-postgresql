import NextAuth from "next-auth/next";
import type { DefaultSession } from "next-auth";

type myUserType = {
  id: string | null | undefined;
} & DefaultSession['user']

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: myUserType
  }
}
