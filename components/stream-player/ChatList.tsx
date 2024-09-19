"use client";

import type { ReceivedChatMessage } from "@livekit/components-react";

import { Skeleton } from "@/components/ui/skeleton";
import { useStreamPlayerIntl } from "../StreamPlayerIntlProvider";
import ChatMessage from "./ChatMessage";

interface ChatListProps {
	messages: ReceivedChatMessage[];
	isHidden: boolean;
}

export function ChatList({ messages, isHidden }: ChatListProps) {
	const { translations } = useStreamPlayerIntl();

	if (isHidden || !messages || messages.length === 0)
		return (
			<div className="flex flex-1 items-center justify-center">
				<p className="text-sm text-muted-foreground">
					{isHidden ? translations.hiddenChat : translations.welcomeChat}
				</p>
			</div>
		);

	return (
		<div className="flex flex-1 flex-col-reverse overflow-y-auto p-3 h-full">
			{messages.map((message) => (
				<ChatMessage data={message} key={message.id} />
			))}
		</div>
	);
}

export function ChatListSkeleton() {
	return (
		<div className="flex h-full items-center justify-center">
			<Skeleton className="w-1/2 h-6" />
		</div>
	);
}
