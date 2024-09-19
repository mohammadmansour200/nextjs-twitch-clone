"use client";

import { ChatVariant, useChatSidebar } from "@/store/useChatSidebar";

import {
	useChat,
	useConnectionState,
	useRemoteParticipant,
} from "@livekit/components-react";
import { ConnectionState } from "livekit-client";

import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

import ChatCommunity from "./ChatCommunity";
import { ChatForm, ChatFormSkeleton } from "./ChatForm";
import ChatHeader, { ChatHeaderSkeleton } from "./ChatHeader";
import { ChatList, ChatListSkeleton } from "./ChatList";

interface ChatProps {
	hostName: string;
	hostIdentity: string;
	viewerName: string;
	isFollowing: boolean;
	isChatEnabled: boolean;
	isChatDelayed: boolean;
	isChatFollowersOnly: boolean;
}

function Chat({
	hostName,
	hostIdentity,
	viewerName,
	isFollowing,
	isChatEnabled,
	isChatDelayed,
	isChatFollowersOnly,
}: ChatProps) {
	const [value, setValue] = useState("");

	const matches = useMediaQuery("(max-width: 1024px)");
	const { chatMessages, send } = useChat();
	const { variant, onExpand } = useChatSidebar();
	const connectionState = useConnectionState();
	const participant = useRemoteParticipant(hostIdentity);

	const isOnline = participant && connectionState === ConnectionState.Connected;

	const isHidden = !isChatEnabled || !isOnline;

	useEffect(() => {
		if (matches) onExpand();
	}, [matches, onExpand]);

	const reversedMessages = useMemo(() => {
		return chatMessages.sort((a, b) => b.timestamp - a.timestamp);
	}, [chatMessages]);

	function onSubmit() {
		if (!send) return;

		send(value);
		setValue("");
	}

	return (
		<div className="flex flex-col bg-background border-s border-b pt-0 h-[calc(100vh-60px)]">
			<ChatHeader />
			{variant === ChatVariant.CHAT && (
				<>
					<ChatList messages={reversedMessages} isHidden={isHidden} />
					<ChatForm
						onSubmit={onSubmit}
						value={value}
						onChange={(value: string) => setValue(value)}
						isHidden={isHidden}
						isFollowersOnly={isChatFollowersOnly}
						isDelayed={isChatDelayed}
						isFollowing={isFollowing}
					/>
				</>
			)}
			{variant === ChatVariant.COMMUNITY && (
				<ChatCommunity
					viewerName={viewerName}
					hostName={hostName}
					isHidden={isHidden}
				/>
			)}
		</div>
	);
}

export default Chat;

export function ChatSkeleton() {
	return (
		<div className="flex flex-col border-s border-b pt-0 h-[calc(100vh-80px)] border-2">
			<ChatHeaderSkeleton />
			<ChatListSkeleton />
			<ChatFormSkeleton />
		</div>
	);
}
