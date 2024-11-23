import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import apiClient from "@/lib/apiClient"; 
import { gql } from "@apollo/client";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Invalid credentials");
        }

        const LOGIN_MUTATION = gql`
          mutation Login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              accessToken
              userId
              email
              role
              jobRole
              isVerified
            }
          }
        `;

        try {
          const response = await apiClient.mutate({
            mutation: LOGIN_MUTATION,
            variables: {
              email: credentials.email,
              password: credentials.password,
            },
          });

          const { accessToken, userId, email, role, jobRole, isVerified } = response.data.login;

          if (accessToken) {
            return {
              id: userId,
              token: accessToken,
              email,
              role: role || "user",
              jobRole,
              isVerified
            };
          }

          return null;
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.jobRole = user.jobRole;
        token.isVerified = user.isVerified;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = {
        id: token.id,
        email: token.email,
        role: token.role || "user",
        jobRole: token.jobRole,
        isVerified: token.isVerified
      };
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
