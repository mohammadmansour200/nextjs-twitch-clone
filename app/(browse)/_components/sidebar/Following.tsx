"use client";

import { useSidebar } from "@/store/useSidebar";
import type { Follow, User } from "@prisma/client";
import UserItem, { UserItemSkeleton } from "./UserItem";

interface FollowingProps {
	data: (Follow & {
		following: User & { stream: { isLive: boolean } | null };
	})[];
	label: string;
}

function Following({ data, label }: FollowingProps) {
	const { collapsed } = useSidebar();

	if (!data.length) return null;

	return (
		<div>
			{!collapsed && (
				<div className="ps-2 mb-4">
					<p className="text-muted-foreground">{label}</p>
				</div>
			)}
			<ul className="space-y-2 px-2">
				{data.map((follow) => (
					<UserItem
						username={follow.following.username}
						imageUrl={follow.following.imageUrl}
						isLive={follow.following.stream?.isLive}
						key={follow.id}
					/>
				))}
			</ul>
		</div>
	);
}

export default Following;

export function FollowingSkeleton() {
	return (
		<ul className="px-2">
			<UserItemSkeleton />
			<UserItemSkeleton />
		</ul>
	);
}
