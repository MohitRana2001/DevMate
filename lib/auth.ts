console.log("Auth config file loaded");
import { db } from "@/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { AuthOptions, DefaultSession, getServerSession } from "next-auth";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}
console.log("Auth configuration loading...");
export const authConfig: AuthOptions = {
  adapter: DrizzleAdapter(db) as Adapter,
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({user, account, token }) {
        console.log("JWT Callback - Account ID:", account?.userId); // Debugging line
        if (account && user) {
          token.uid = user.id;
          console.log("JWT Callback - User ID:", user.id); // Debugging line
        }
        return token;
      },
      async session({ session, token }) {
        console.log("Session Callback - Token ID:", token.id); // Debugging line
        if (session.user && token.uid) {
          session.user.id = token.uid as string;
          console.log("Session Callback - User ID:", token.id); // Debugging line
        }
        return session;
      },
  },
  debug: process.env.NODE_ENV === "development",
};

export async function getServerSideSession() {
  const session = await getServerSession(authConfig);
  console.log("Server-side session:", session);
  return session;
}