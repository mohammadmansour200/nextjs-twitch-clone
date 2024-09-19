import { db } from "@/lib/db";
import { getSelf } from "./auth-service";

export async function getStreamByUserId(userId: string | undefined) {
	const stream = await db.stream.findUnique({
		where: { userId },
	});

	return stream;
}

export async function getStreams() {
	let userId: string | null | undefined;
	try {
		const self = await getSelf();
		userId = self?.user?.userId;
	} catch {
		userId = null;
	}

	let streams = [];

	if (userId) {
		streams = await db.stream.findMany({
			select: {
				thumbnailUrl: true,
				name: true,
				isLive: true,
				user: true,
				id: true,
			},
			where: {
				user: {
					NOT: {
						blocking: {
							some: {
								blockedId: userId,
							},
						},
					},
				},
			},
			orderBy: [{ isLive: "desc" }, { updatedAt: "desc" }],
		});
	} else {
		streams = await db.stream.findMany({
			select: {
				thumbnailUrl: true,
				name: true,
				isLive: true,
				user: true,
				id: true,
			},
			orderBy: [{ isLive: "desc" }, { updatedAt: "desc" }],
		});
	}

	return streams;
}

export async function getStreamsFromSearch(term?: string) {
	let userId: string | null | undefined;
	try {
		const self = await getSelf();
		userId = self?.user?.userId;
	} catch {
		userId = null;
	}

	let streams = [];

	if (userId) {
		streams = await db.stream.findMany({
			where: {
				user: {
					NOT: {
						blocking: {
							some: {
								blockedId: userId,
							},
						},
					},
				},
				OR: [
					{
						name: {
							contains: term,
						},
					},
					{
						user: {
							username: { contains: term },
						},
					},
				],
			},
			select: {
				thumbnailUrl: true,
				name: true,
				isLive: true,
				user: true,
				id: true,
				updatedAt: true,
			},
			orderBy: [{ isLive: "desc" }, { updatedAt: "desc" }],
		});
	} else {
		streams = await db.stream.findMany({
			where: {
				OR: [
					{
						name: {
							contains: term,
						},
					},
					{
						user: {
							username: { contains: term },
						},
					},
				],
			},
			select: {
				thumbnailUrl: true,
				name: true,
				isLive: true,
				user: true,
				id: true,
				updatedAt: true,
			},
			orderBy: [{ isLive: "desc" }, { updatedAt: "desc" }],
		});
	}

	return streams;
}
