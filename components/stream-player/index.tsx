"use client";

import useViewerToken from "@/hooks/useViewerToken";
import { cn } from "@/lib/cn";
import { useChatSidebar } from "@/store/useChatSidebar";
import { LiveKitRoom } from "@livekit/components-react";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { useStreamPlayerIntl } from "../StreamPlayerIntlProvider";
import AboutCard from "./AboutCard";
import Chat, { ChatSkeleton } from "./Chat";
import ChatToggle from "./ChatToggle";
import Header, { HeaderSkeleton } from "./Header";
import InfoCard from "./InfoCard";
import Video, { VideoSkeleton } from "./Video";

type CustomStream = {
	id: string;
	isChatEnabled: boolean;
	isChatDelayed: boolean;
	isChatFollowersOnly: boolean;
	isLive: boolean;
	thumbnailUrl: string | null;
	name: string;
};

type CustomUser = {
	id: string;
	username: string;
	bio: string | null;
	stream: CustomStream | null;
	imageUrl: string;
	_count: { followedBy: number };
};

interface StreamPlayerProps {
	user: CustomUser;
	stream: CustomStream;
	isFollowing: boolean;
	session: Session | null;
}

function StreamPlayer({
	user,
	stream,
	isFollowing,
	session,
}: StreamPlayerProps) {
	const { direction, translations } = useStreamPlayerIntl();
	const { collapsed } = useChatSidebar();
	const { token, name, identity } = useViewerToken(user.id);

	if (!name || !token || !identity) return <StreamPlayerSkeleton />;

	return (
		<SessionProvider refetchOnWindowFocus session={session}>
			{collapsed && (
				<div className="hidden lg:block fixed top-[65px] ltr:right-2 rtl:left-2 z-50">
					<ChatToggle
						hintDir={direction === "ltr" ? "left" : "right"}
						toggleHint={{
							collapseBtnHint: translations.chatCollapseBtnHint,
							expandBtnHint: translations.chatExpandBtnHint,
						}}
					/>
				</div>
			)}
			<LiveKitRoom
				token={token}
				serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
				className={cn(
					"grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full",
					collapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2",
				)}
			>
				<div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
					<Video hostIdentity={user.id} hostName={user.username} />
					<Header
						hostIdentity={user.id}
						hostName={user.username}
						viewerIdentity={identity}
						imageUrl={user.imageUrl}
						name={stream.name}
						isFollowing={isFollowing}
					/>
					<InfoCard
						hostIdentity={user.id}
						viewerIdentity={identity}
						name={stream.name}
						thumbnailUrl={stream.thumbnailUrl}
					/>
					<AboutCard
						hostName={user.username}
						bio={user.bio}
						followedByCount={user._count.followedBy}
					/>
				</div>
				<div className={cn("col-span-1", collapsed && "hidden")}>
					<Chat
						viewerName={name}
						hostName={user.username}
						hostIdentity={user.id}
						isFollowing={isFollowing}
						isChatEnabled={stream.isChatEnabled}
						isChatDelayed={stream.isChatDelayed}
						isChatFollowersOnly={stream.isChatFollowersOnly}
					/>
				</div>
			</LiveKitRoom>
		</SessionProvider>
	);
}

export default StreamPlayer;

export function StreamPlayerSkeleton() {
	return (
		<div className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full">
			<div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
				<VideoSkeleton />
				<HeaderSkeleton />
			</div>
			<div className="col-span-1 bg-background">
				<ChatSkeleton />
			</div>
		</div>
	);
}
