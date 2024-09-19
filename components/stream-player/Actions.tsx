"use client";

import { onFollow, onUnFollow } from "@/action/follow";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { Heart } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { useStreamPlayerIntl } from "../StreamPlayerIntlProvider";
import { Skeleton } from "../ui/skeleton";

interface ActionsProps {
	isFollowing: boolean;
	hostIdentity: string;
	isHost: boolean;
}

function Actions({ isFollowing, isHost, hostIdentity }: ActionsProps) {
	const { translations } = useStreamPlayerIntl();
	const [isPending, startTransition] = useTransition();

	function handleFollow() {
		startTransition(() => {
			onFollow(hostIdentity)
				.then(() => toast.success(translations.followSuccess))
				.catch(() => toast.error(translations.followError));
		});
	}

	function handleUnfollow() {
		startTransition(() => {
			onUnFollow(hostIdentity)
				.then(() => toast.success(translations.unfollowSuccess))
				.catch(() => toast.error(translations.followError));
		});
	}

	function toggleFollow() {
		if (isHost) return;

		isFollowing ? handleUnfollow() : handleFollow();
	}

	return (
		<Button
			disabled={isPending || isHost}
			onClick={toggleFollow}
			size="sm"
			className="w-full lg:w-auto"
		>
			<Heart
				className={cn(
					"h-4 w-4 mr-2",
					isFollowing ? "fill-background" : "fill-none",
				)}
			/>
			{isFollowing ? translations.unfollowBtn : translations.followBtn}
		</Button>
	);
}

export default Actions;

export function ActionsSkeleton() {
	return <Skeleton className="h-10 w-full lg:w-24" />;
}
