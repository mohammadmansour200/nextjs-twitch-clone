"use client";

import { useSidebar } from "@/store/useSidebar";
import type { User } from "@prisma/client";
import UserItem, { UserItemSkeleton } from "./UserItem";

interface RecommendedProps {
	data: (User & { stream: { isLive: boolean } | null })[];
	label: string;
}

function Recommended({ data, label }: RecommendedProps) {
	const { collapsed } = useSidebar();

	const showLabel = !collapsed && data.length > 0;

	return (
		<div>
			<ul className="space-y-2 px-2">
				{showLabel && <p className="text-muted-foreground">{label}</p>}
				{data.map((user) => (
					<UserItem
						username={user.username}
						imageUrl={user.imageUrl}
						isLive={user.stream?.isLive}
						key={user.id}
					/>
				))}
			</ul>
		</div>
	);
}

export default Recommended;

export function RecommendedSkeleton() {
	return (
		<ul className="px-2">
			<UserItemSkeleton />
			<UserItemSkeleton />
			<UserItemSkeleton />
		</ul>
	);
}
