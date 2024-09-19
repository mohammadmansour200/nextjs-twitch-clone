import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import type { User } from "@prisma/client";

export async function getRecommended() {
	let userId: string | null;

	try {
		const self = await auth();
		if (!self) throw new Error("Unauthorized");

		userId = self?.user?.userId as string;
	} catch {
		userId = null;
	}

	let users: (User & { stream: { isLive: boolean } | null })[] = [];
	if (userId) {
		users = await db.user.findMany({
			where: {
				AND: [
					{
						//Don't show the user himself in his recommendations
						NOT: {
							id: userId,
						},
					},
					{
						//Don't show followed users in the recommendations
						NOT: {
							followedBy: {
								some: {
									followerId: userId,
								},
							},
						},
					},
					{
						//Don't show users who blocked the current user in the recommendations
						NOT: {
							blocking: {
								some: {
									blockedId: userId,
								},
							},
						},
					},
				],
			},
			include: {
				stream: {
					select: {
						isLive: true,
					},
				},
			},
			orderBy: { createdAt: "desc" },
		});
	} else {
		users = await db.user.findMany({
			orderBy: {
				createdAt: "desc",
			},
			include: {
				stream: {
					select: {
						isLive: true,
					},
				},
			},
		});
	}
	return users;
}
