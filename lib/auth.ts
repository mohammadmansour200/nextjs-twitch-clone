import generateFromEmail from "@/utils/generateUsernameFromEmail";
import NextAuth, { type NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { db } from "./db";

const authConfig: NextAuthConfig = {
	providers: [
		Google({
			clientId: process.env.AUTH_GOOGLE_ID,
			clientSecret: process.env.AUTH_GOOGLE_SECRET,
		}),
	],
	callbacks: {
		authorized({ auth }) {
			return !!auth?.user;
		},
		async signIn({ user }) {
			try {
				if (!user?.email || !user.name) return false;
				const existingGuest = await db.user.findUnique({
					where: { email: user.email },
				});

				if (!existingGuest)
					await db.user.create({
						data: {
							email: user?.email,
							username: generateFromEmail(user.email),
							imageUrl: user?.image || "",
							stream: {
								create: {
									name: `${user.name} Stream`,
								},
							},
						},
					});

				return true;
			} catch (error) {
				return false;
			}
		},
		async session({ session }) {
			const guest = await db.user.findFirst({
				where: { email: session.user.email },
			});
			session.user.userId = guest?.id;
			session.user.username = guest?.username;
			session.user.bio = guest?.bio;
			return session;
		},
	},
	pages: {
		signIn: "/login",
	},
};

export const {
	auth,
	signIn,
	signOut,
	handlers: { GET, POST },
} = NextAuth(authConfig);
