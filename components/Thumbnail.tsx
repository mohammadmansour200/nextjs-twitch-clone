import Image from "next/image";
import LiveBadge from "./LiveBadge";
import UserAvatar from "./UserAvatar";
import { Skeleton } from "./ui/skeleton";

interface ThumbnailProps {
	isLive: boolean;
	src: string | null;
	fallback: string;
	username: string;
}

function Thumbnail({ isLive, src, fallback, username }: ThumbnailProps) {
	return (
		<div className="group aspect-video relative rounded-md cursor-pointer">
			<div className="rounded-md absolute inset-0 bg-foreground opacity-0 group-hover:opacity-100 flex items-center justify-center" />
			{!src && (
				<div className="bg-muted flex flex-col items-center justify-center gap-y-4 h-full w-full transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 rounded-md">
					<UserAvatar
						showBadge
						size="lg"
						username={username}
						imageUrl={fallback}
						isLive={isLive}
					/>
				</div>
			)}
			{src && (
				<Image
					src={src}
					fill
					alt="Thumbnail"
					className="object-cover transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 rounded-md"
				/>
			)}
			{isLive && src && (
				<div className="absolute top-2 left-2 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform">
					<LiveBadge />
				</div>
			)}
		</div>
	);
}

export default Thumbnail;

export function ThumbnailSkeleton() {
	return (
		<div className="group aspect-video relative rounded-md">
			<Skeleton className="h-full w-full" />
		</div>
	);
}
