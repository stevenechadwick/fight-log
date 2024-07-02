import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import prisma from "@lib/prisma";

const authOptions = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Username and Password",
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials, req) {
        if (!credentials) return null;

        const user = await prisma.user.findFirst({
          where: {
            name: credentials.username,
          },
        });

        if (user && await bcrypt.compare(credentials.password, user.password)) {
          return {
            id: user.id,
            name: user.name,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };