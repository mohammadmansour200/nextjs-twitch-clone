import { db } from "@/lib/db";
import { getSelf } from "./auth-service";

export async function isBlockedByUser(id: string) {
	try {
		const self = await getSelf();

		const otherUser = await db.user.findUnique({ where: { id } });

		if (!otherUser) throw new Error("User not found");

		if (otherUser.id === self?.user?.userId) {
			return false;
		}

		//findUnique is faster because of the index we made
		const existingBlock = await db.block.findUnique({
			where: {
				blockedId_blockerId: {
					blockerId: otherUser.id,
					blockedId: self?.user?.userId as string,
				},
			},
		});

		return !!existingBlock;
	} catch {
		return false;
	}
}

export async function blockUser(id: string) {
	const self = await getSelf();

	if (self?.user?.userId === id) throw new Error("Cannot block yourself bro");

	const otherUser = await db.user.findUnique({
		where: {
			id,
		},
	});

	if (!otherUser) throw new Error("User not found");

	const existingBlock = await db.block.findUnique({
		where: {
			blockedId_blockerId: {
				blockedId: otherUser.id,
				blockerId: self?.user?.userId as string,
			},
		},
	});

	if (existingBlock) throw new Error("User is already blocked");

	const block = await db.block.create({
		data: { blockerId: self?.user?.userId as string, blockedId: otherUser.id },
		include: { blocked: true },
	});

	return block;
}

export async function unblockUser(id: string) {
	const self = await getSelf();

	if (self?.user?.userId === id) throw new Error("Cannot unblock yourself bro");

	const otherUser = await db.user.findUnique({
		where: {
			id,
		},
	});

	if (!otherUser) throw new Error("User not found");

	const existingBlock = await db.block.findUnique({
		where: {
			blockedId_blockerId: {
				blockedId: otherUser.id,
				blockerId: self?.user?.userId as string,
			},
		},
	});

	if (!existingBlock) throw new Error("User is already not blocked");

	const unblock = await db.block.delete({
		where: { id: existingBlock.id },
		include: { blocked: true },
	});

	return unblock;
}

export async function getBlockedUsers() {
	const self = await getSelf();

	const blockedUsers = await db.block.findMany({
		where: { blockerId: self.user?.userId },
		include: { blocked: true },
	});

	return blockedUsers;
}
