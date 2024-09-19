import { db } from "@/lib/db";
import { getSelf } from "./auth-service";

export async function getFollowedUsers() {
	try {
		const self = await getSelf();

		return await db.follow.findMany({
			where: {
				followerId: self?.user?.userId,
				following: {
					//Make sure user who is followed is not blocking that user
					blocking: {
						none: {
							blockedId: self?.user?.userId,
						},
					},
				},
			},
			include: {
				following: {
					include: {
						stream: { select: { isLive: true } },
					},
				},
			},
		});
	} catch {
		return [];
	}
}

export async function isFollowingUser(id: string) {
	try {
		const self = await getSelf();

		const otherUser = await db.user.findUnique({
			where: {
				id,
			},
		});

		//If there is no user with this id
		if (!otherUser) throw new Error("User not found");

		//If user is trying to follow himself :)
		if (otherUser.id === self?.user?.userId) return true;

		const existingFollow = await db.follow.findUnique({
			where: {
				followerId_followingId: {
					followingId: otherUser.id,
					followerId: self?.user?.userId as string,
				},
			},
		});

		//If there is an existing follow, return true, else false
		return !!existingFollow;
	} catch {
		return false;
	}
}

export async function followUser(id: string) {
	const self = await getSelf();

	const otherUser = await db.user.findUnique({
		where: {
			id,
		},
	});

	if (!otherUser) throw new Error("User not found");

	if (otherUser.id === self?.user?.userId)
		throw new Error("Cannot follow yourself");

	const existingFollow = await db.follow.findUnique({
		where: {
			followerId_followingId: {
				followingId: otherUser.id,
				followerId: self?.user?.userId as string,
			},
		},
	});

	//If there is already an existing follow
	if (existingFollow) throw new Error("Already following");

	const follow = await db.follow.create({
		data: {
			followerId: self?.user?.userId as string,
			followingId: otherUser.id,
		},
		include: {
			following: true,
		},
	});

	return follow;
}

export async function unFollowUser(id: string) {
	const self = await getSelf();

	const otherUser = await db.user.findUnique({
		where: {
			id,
		},
	});

	if (!otherUser) throw new Error("User not found");

	if (otherUser.id === self?.user?.userId)
		throw new Error("Cannot unfollow yourself");

	const existingFollow = await db.follow.findUnique({
		where: {
			followerId_followingId: {
				followingId: otherUser.id,
				followerId: self?.user?.userId as string,
			},
		},
	});

	//If there is already an existing follow
	if (!existingFollow) throw new Error("Not followed");

	const follow = await db.follow.delete({
		where: {
			id: existingFollow.id,
		},
		include: {
			following: true,
		},
	});

	return follow;
}
