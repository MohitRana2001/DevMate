import { db } from "@/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { AuthOptions, DefaultSession, getServerSession } from "next-auth";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { v4 as uuidv4 } from 'uuid';
import { users } from "@/db/schema"; // Import the users table

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      isGuest?: boolean; // Add isGuest to the Session user type
    } & DefaultSession["user"];
  }
}

export const authConfig: AuthOptions = {
  adapter: DrizzleAdapter(db) as Adapter,
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: 'Guest',
      credentials: {
        name: { label: "Guest Name :- ", type: "text", placeholder: "Enter your name" }
      },
      async authorize(credentials) {
        if (!credentials?.name) return null;
        
        const guestUser = {
          id: uuidv4(),
          name: credentials.name,
          email: `guest_${uuidv4()}@example.com`,
          image: null,
          isGuest: true, // Set isGuest to true for guest users
        };

        // Save guest user to the database
        await db.insert(users).values(guestUser);

        return guestUser;
      }
    })
  ],
  callbacks: {
    async jwt({ user, account, token }) {
      if (account && user) {
        token.uid = user.id;
        token.isGuest = account.provider === 'credentials';
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.uid) {
        session.user.id = token.uid as string;
        session.user.isGuest = token.isGuest as boolean;
      }
      return session;
    },
  },
};

export async function getServerSideSession() {
  const session = await getServerSession(authConfig);
  return session;
}