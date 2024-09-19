"use server";

import { getSelf } from "@/services/auth-service";
import { blockUser, unblockUser } from "@/services/block-service";
import { RoomServiceClient } from "livekit-server-sdk";
import { revalidatePath } from "next/cache";

const roomService = new RoomServiceClient(
	process.env.LIVEKIT_API_URL as string,
	process.env.LIVEKIT_API_KEY,
	process.env.LIVEKIT_API_SECRET,
);

export async function onBlock(id: string) {
	const self = await getSelf();

	// biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
	let blockedUser;

	try {
		blockedUser = await blockUser(id);
	} catch {
		// This means user is a guest
	}

	try {
		await roomService.removeParticipant(self?.user?.userId as string, id);
	} catch {
		// This means user is not in the room
	}

	revalidatePath(`/u/${self?.user?.username}/community`);

	return blockedUser;
}

export async function onUnblock(id: string) {
	const self = await getSelf();
	const unblockedUser = await unblockUser(id);

	revalidatePath(`/u/${self.user?.username}/community`);

	return unblockedUser;
}
