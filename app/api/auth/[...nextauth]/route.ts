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
  ]
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }