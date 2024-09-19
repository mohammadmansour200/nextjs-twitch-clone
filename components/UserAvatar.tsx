import { cn } from "@/lib/cn";
import { type VariantProps, cva } from "class-variance-authority";
import LiveBadge from "./LiveBadge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";

const avatarSizes = cva("", {
	variants: {
		size: {
			default: "h-8 w-8",
			lg: "h-14 w-14",
		},
	},
	defaultVariants: {
		size: "default",
	},
});

interface UserAvatarProps extends VariantProps<typeof avatarSizes> {
	username: string;
	imageUrl: string;
	isLive?: boolean;
	showBadge?: boolean;
}

function UserAvatar({
	username,
	imageUrl,
	isLive,
	showBadge,
	size,
}: UserAvatarProps) {
	const canShowBadge = showBadge && isLive;
	return (
		<div className="relative">
			<Avatar
				className={cn(
					isLive && "ring-2 ring-rose-500 border border-background",
					avatarSizes({ size }),
				)}
			>
				{imageUrl !== "" && (
					<AvatarImage src={imageUrl} className="object-cover" />
				)}
				<AvatarFallback>
					{username[0]}
					{username[username.length - 1]}
				</AvatarFallback>
			</Avatar>
			{canShowBadge && (
				<div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
					<LiveBadge />
				</div>
			)}
		</div>
	);
}

export default UserAvatar;

interface UserAvatarSkeletonProps extends VariantProps<typeof avatarSizes> {}
export function UserAvatarSkeleton({ size }: UserAvatarSkeletonProps) {
	return <Skeleton className={cn("rounded-full", avatarSizes({ size }))} />;
}
