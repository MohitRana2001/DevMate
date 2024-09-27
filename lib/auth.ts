import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { getServerSession, AuthOptions, DefaultSession } from "next-auth";
import { Adapter } from "next-auth/adapters";
import { db } from "@/db";
import GoogleProvider from "next-auth/providers/google";



declare module "next-auth" {
    interface Session extends DefaultSession {
        user : {
            id : String;
        } & DefaultSession["user"];
    }
}

export const authConfig = {
    adapter : DrizzleAdapter(db) as Adapter,
    session : {
        strategy : "jwt",
    },
    providers : [
        GoogleProvider({
            clientId : process.env.GOOGLE_CLIENT_ID!,
            clientSecret : process.env.GOOGLE_CLIENT_SECRET!
        }),
    ],
    callbacks : {
        async jwt ({token, user}) {
            const dbUser = await db.query.users.findFirst({
                where : (users, { eq }) => eq(users.email, token.email!),
            });

            if(!dbUser) {
                throw new Error("no user with email found");
            }

            return {
                id : token.id as string,
                name : token.name,
                email : token.email,
                picture : token.image,
            };
        },

        async session ({token , session}) {
            if(token) {
                session.user = {
                    id : token.id as string,
                    name : token.name,
                    email : token.email,
                    image : token.picture,
                };
            }
            return session;
        },

    },
} satisfies AuthOptions;

export function getSession() {
    return getServerSession(authConfig);
}