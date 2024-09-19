import { auth, signOut } from "@/lib/auth";
import { db } from "@/lib/db";

export async function getSelfByUsername(username: string) {
	const self = await auth();

	if (!self || !self.user) return signOut({ redirectTo: "/login" });

	const user = await db.user.findUnique({
		where: { username },
	});

	if (!user) throw new Error("User not found");
	if (self.user.username !== user.username) throw new Error("Unauthorized");

	return user;
}

export const getSelf = async () => {
	const self = await auth();

	if (!self || !self.user?.username || !self.user.userId)
		throw new Error("Unauthorized");

	return self;
};
