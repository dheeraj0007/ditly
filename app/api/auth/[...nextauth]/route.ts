import GoogleProvider from "next-auth/providers/google";
import NextAuth, { type DefaultSession } from "next-auth";
import { prismaClient } from "@/app/lib/db";
import Github from "next-auth/providers/github";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

const handler = NextAuth({
  providers: [
    Github({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET ?? "secret",
  callbacks: {
    async signIn(params) {
      if (!params.user.email) {
        return false;
      }

      try {
        const existingUser = await prismaClient.user.findUnique({
          where: {
            email: params.user.email,
          },
        });
        if (existingUser) {
          return true;
        }
        await prismaClient.user.create({
          data: {
            email: params.user.email,
            name: params.user.name || "",
            provider: params.user.image?.includes("github")
              ? "Github"
              : "Google",
          },
        });
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    async session({ session, token, user }) {
      const dbUser = await prismaClient.user.findUnique({
        where: {
          email: session.user.email as string,
        },
      });
      if (!dbUser) {
        return session;
      }
      return {
        ...session,
        user: {
          id: dbUser.id,
          name: dbUser.name,
          email: dbUser.email,
          image: session.user.image,
        },
      };
    },
  },
});

export { handler as GET, handler as POST };
