import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT as NextAuthJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user?: {
      id?: number;
      role?: string;
      jobRole?: string;
      isVerified?: boolean;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    token: string;
    id?: number;
    role?: string;
    jobRole?: string;
    isVerified?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    id?: number;
    role?: string;
    jobRole?: string;
    isVerified?: boolean;
  }
}