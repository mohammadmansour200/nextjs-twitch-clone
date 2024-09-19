"use server";

import { db } from "@/lib/db";
import { getSelf } from "@/services/auth-service";
import type { Stream } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function updateStream(values: Partial<Stream>) {
	try {
		const self = await getSelf();

		const selfStream = await db.stream.findUnique({
			where: {
				userId: self?.user?.userId,
			},
		});

		if (!selfStream) throw new Error("Stream not found");

		const validData = {
			name: values.name,
			isChatEnabled: values.isChatEnabled,
			isChatFollowersOnly: values.isChatFollowersOnly,
			isChatDelayed: values.isChatDelayed,
		};

		await db.stream.update({
			where: {
				id: selfStream.id,
			},
			data: {
				...validData,
			},
		});

		revalidatePath(`/u/${self?.user?.username}/chat`);
		revalidatePath(`/u/${self?.user?.username}`);
		revalidatePath(`/${self?.user?.username}`);
	} catch {
		throw new Error("Internal Error");
	}
}
