"use server";

import { followUser, unFollowUser } from "@/services/follow-service";
import { revalidatePath } from "next/cache";

export async function onFollow(id: string) {
	try {
		const followedUser = await followUser(id);

		revalidatePath("/");

		if (followedUser) {
			revalidatePath(`/${followedUser.following.username}`);
		}

		return followedUser;
	} catch {
		throw new Error("Internal server error");
	}
}

export async function onUnFollow(id: string) {
	try {
		const unfollowedUser = await unFollowUser(id);

		revalidatePath("/");

		if (unfollowedUser) {
			revalidatePath(`/${unfollowedUser.following.username}`);
		}

		return unfollowedUser;
	} catch {
		throw new Error("Internal server error");
	}
}
