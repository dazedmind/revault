import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email?: string;
      name?: string;
    }
  }
}

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.users.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await compare(credentials.password, user.password);

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.user_id.toString(),
          email: user.email,
          name: `${user.first_name} ${user.mid_name} ${user.last_name} ${user.ext_name}`.trim(),
        };
      }
    })
  ],
  callbacks: {
    async signIn({ user }) {
      // Only log admin logins, if needed
      try {
        await prisma.activity_logs.create({
          data: {
            user_id: parseInt(user.id),
            name: user.name ?? "Unknown",
            activity: `Logged in`,
            activity_type: "LOGIN" as const,
            user_agent: "",
            ip_address: "",
            status: "success"
          },
        });
      } catch (err) {
        console.error("Failed to log login activity:", err);
      }
      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
      }
      return session;
    }
  },
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login",
  }
}; 