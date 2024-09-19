"use server";

import { signOut } from "@/lib/auth";
import { db } from "@/lib/db";
import { getSelf } from "@/services/auth-service";
import { resetIngress } from "./ingress";

export async function changeUsername(userId: string, formData: FormData) {
	const username = formData.get("username")?.toString();
	await db.user.update({
		where: {
			id: userId,
		},
		data: {
			username,
		},
	});
}

export async function changeBio(userId: string, formData: FormData) {
	const bio = formData.get("bio")?.toString();
	await db.user.update({
		where: {
			id: userId,
		},
		data: {
			bio,
		},
	});
}

export async function deleteUser() {
	const session = await getSelf();

	await db.user.delete({
		where: {
			id: session.user?.userId,
		},
	});

	await resetIngress(session?.user?.userId as string);
	await signOut({ redirectTo: "/" });
}
