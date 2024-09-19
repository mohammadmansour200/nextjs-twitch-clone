import Thumbnail, { ThumbnailSkeleton } from "@/components/Thumbnail";
import { UserAvatarSkeleton } from "@/components/UserAvatar";
import VerifiedMark from "@/components/stream-player/VerifiedMark";
import { Skeleton } from "@/components/ui/skeleton";
import type { User } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

interface ResultCardProps {
	data: {
		id: string;
		name: string;
		thumbnailUrl: string | null;
		isLive: boolean;
		updatedAt: Date;
		user: User;
	};
}

function ResultCard({ data }: ResultCardProps) {
	return (
		<Link href={`/${data.user.username}`}>
			<div className="w-full flex gap-x-4">
				<div className="relative h-[9rem] w-[16rem]">
					<Thumbnail
						src={data.thumbnailUrl}
						fallback={data.user.imageUrl}
						isLive={data.isLive}
						username={data.user.username}
					/>
				</div>
				<div className="space-y-2">
					<div className="flex gap-x-2 items-center">
						<p className="font-bold text-lg cursor-pointer">
							{data.user.username}
						</p>
						<VerifiedMark />
					</div>
					<p className="text-sm text-muted-foreground">{data.name}</p>
					<p className="text-sm text-muted-foreground">
						{formatDistanceToNow(new Date(data.updatedAt), {
							addSuffix: true,
						})}
					</p>
				</div>
			</div>
		</Link>
	);
}

export default ResultCard;

export function ResultCardSkeleton() {
	return (
		<div className="w-full flex gap-x-4">
			<div className="relative h-[9rem] w-[16rem]">
				<ThumbnailSkeleton />
			</div>
			<div className="flex gap-x-3">
				<UserAvatarSkeleton />
				<div className="space-y-2">
					<Skeleton className="h-4 w-32" />
					<Skeleton className="h-3 w-24" />
					<Skeleton className="h-3 w-12" />
				</div>
			</div>
		</div>
	);
}
