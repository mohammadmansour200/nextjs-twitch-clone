"use server";

import { getSelf } from "@/services/auth-service";
import { isBlockedByUser } from "@/services/block-service";
import { getUserById } from "@/services/user-service";
import { AccessToken } from "livekit-server-sdk";
import type { Session } from "next-auth";
import { v4 } from "uuid";

export async function createViewerToken(hostIdentity: string) {
	let self: Partial<Session> | null;

	try {
		self = await getSelf();
	} catch {
		const id = v4();

		const username = `guest#${Math.floor(Math.random() * 1000)}`;
		self = {
			user: {
				userId: id,
				username,
			},
		};
	}
	const host = await getUserById(hostIdentity);

	if (!host) throw new Error("User not found");

	const isBLocked = await isBlockedByUser(host.id);

	if (isBLocked) throw new Error("User is blocked");

	const isHost = self?.user?.userId === host.id;

	const token = new AccessToken(
		process.env.LIVEKIT_API_KEY,
		process.env.LIVEKIT_API_SECRET,
		{
			identity: isHost ? `host-${self?.user?.userId}` : self?.user?.userId,
			name: self?.user?.username,
		},
	);

	token.addGrant({
		room: host.id,
		roomJoin: true,
		canPublish: false,
		canPublishData: true,
	});

	return await Promise.resolve(token.toJwt());
}
