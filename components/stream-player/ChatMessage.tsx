"use client";

import { stringToColor } from "@/utils/stringToColor";
import type { ReceivedChatMessage } from "@livekit/components-react";
import { format } from "date-fns";

interface ChatMessageProps {
	data: ReceivedChatMessage;
}

function ChatMessage({ data }: ChatMessageProps) {
	const color = stringToColor(data.from?.name || "");
	return (
		<div className="flex gap-2 p-2 rounded-md hover:bg-foreground/5">
			<p className="text-sm text-foreground/40">
				{format(data.timestamp, "HH:MM")}
			</p>
			<div className="flex flex-wrap items-baseline gap-1 grow">
				<p className="text-sm font-semibold whitespace-nowrap">
					<span className="truncate" style={{ color }}>
						{data.from?.name}
					</span>
					:
				</p>
				<p className="text-sm break-all" dir="auto">
					{data.message}
				</p>
			</div>
		</div>
	);
}

export default ChatMessage;
