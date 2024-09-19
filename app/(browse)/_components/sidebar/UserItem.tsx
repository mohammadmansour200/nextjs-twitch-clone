"use client";

import LiveBadge from "@/components/LiveBadge";
import UserAvatar from "@/components/UserAvatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/cn";
import { useSidebar } from "@/store/useSidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface UserItemProps {
	username: string;
	imageUrl: string;
	isLive?: boolean;
}
function UserItem({ imageUrl, username, isLive }: UserItemProps) {
	const pathname = usePathname();
	const { collapsed } = useSidebar();

	const href = `/${username}`;
	const isActive = pathname === href;

	return (
		<Button
			asChild
			variant="ghost"
			className={cn(
				"w-full h-12",
				collapsed ? "justify-center" : "justify-start",
				isActive && "bg-accent",
			)}
		>
			<Link href={href}>
				<div
					className={cn(
						"flex items-center w-full gap-x-4",
						collapsed && "justify-center",
					)}
				>
					<UserAvatar username={username} isLive={isLive} imageUrl={imageUrl} />
					{!collapsed && <p className="truncate">{username}</p>}
					{!collapsed && isLive && <LiveBadge className="ml-auto" />}
				</div>
			</Link>
		</Button>
	);
}

export default UserItem;

export function UserItemSkeleton() {
	return (
		<li className="flex items-center gap-x-4 px-3 py-2">
			<Skeleton className="min-h-[32px] min-w-[32px] rounded-full" />
			<div className="flex-1">
				<Skeleton className="h-6" />
			</div>
		</li>
	);
}
