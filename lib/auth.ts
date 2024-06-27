import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import db from "@/lib/db";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  trustHost: true,

  providers: [
    Credentials({
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials.username || !credentials.password) return null;

        // Check if the user exists and the password is correct
        const existingUser = await db.users.findUnique({
          where: { username: credentials.username as string },
        });
        if (!existingUser) return null;

        const passwordMatch = await compare(
          credentials.password as string,
          existingUser.password
        );
        if (!passwordMatch) return null;

        // return the user data object
        const { id, username } = existingUser;
        return { id, username };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        return {
          ...token,
          id: user.id,
          username: user.username,
        };
      }
      return token;
    },

    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          username: token.username,
        },
      };
    },
  },
});
