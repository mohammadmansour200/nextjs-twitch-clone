"use client";

import UserAvatar, { UserAvatarSkeleton } from "@/components/UserAvatar";
import VerifiedMark from "@/components/stream-player/VerifiedMark";
import {
	useParticipants,
	useRemoteParticipant,
} from "@livekit/components-react";
import { UserIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useStreamPlayerIntl } from "../StreamPlayerIntlProvider";
import { Skeleton } from "../ui/skeleton";
import Actions, { ActionsSkeleton } from "./Actions";

interface HeaderProps {
	hostName: string;
	hostIdentity: string;
	viewerIdentity: string;
	imageUrl: string;
	isFollowing: boolean;
	name: string | null;
}

function Header({
	hostIdentity,
	hostName,
	viewerIdentity,
	imageUrl,
	isFollowing,
	name,
}: HeaderProps) {
	const { translations } = useStreamPlayerIntl();

	const { status } = useSession();
	const participants = useParticipants();
	const participant = useRemoteParticipant(hostIdentity);

	const isLive = !!participant;
	const participantCount = participants.length - 1;

	const hostAsViewer = `host-${hostIdentity}`;
	const isHost = viewerIdentity === hostAsViewer;

	return (
		<div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
			<div className="flex items-center gap-x-3">
				<UserAvatar
					imageUrl={imageUrl}
					username={hostName}
					size="lg"
					isLive={isLive}
					showBadge
				/>
				<div className="space-y-1">
					<div className="flex items-center gap-x-2">
						<h2 className="text-lg font-semibold">{hostName}</h2>
						<VerifiedMark />
					</div>
					<p dir="auto">{name}</p>
					{isLive ? (
						<div className="font-semibold flex gap-x-1 items-center text-xs text-rose-500">
							<UserIcon className="h-4 w-4" />
							<p>{participantCount}</p>
						</div>
					) : (
						<p className="font-semibold text-xs text-muted-foreground">
							{translations.userOffline}
						</p>
					)}
				</div>
			</div>
			{status === "authenticated" && !isHost && (
				<Actions
					isFollowing={isFollowing}
					hostIdentity={hostIdentity}
					isHost={isHost}
				/>
			)}
		</div>
	);
}

export default Header;

export function HeaderSkeleton() {
	return (
		<div className="flex flex-col-1 lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
			<div className="flex items-center gap-x-3">
				<UserAvatarSkeleton size="lg" />
				<div className="space-y-2">
					<Skeleton className="h-6 w-32" />
					<Skeleton className="h-4 w-24" />
				</div>
			</div>
			<ActionsSkeleton />
		</div>
	);
}
