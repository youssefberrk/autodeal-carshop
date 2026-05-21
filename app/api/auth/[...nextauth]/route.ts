import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { authOptions } from "@/auth";

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
	callbacks: {
		async session({ session, user, token }) {
			if (session.user) {
				(session.user as any).id = token.sub || `user-${Math.random()}`;
			}
			return session;
		},
	},
});

export { handler as GET, handler as POST };