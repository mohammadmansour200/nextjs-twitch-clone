"use client";

import { useParticipants } from "@livekit/components-react";
import type { LocalParticipant, RemoteParticipant } from "livekit-client";
import { useMemo, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { useStreamPlayerIntl } from "../StreamPlayerIntlProvider";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import CommunityItem from "./CommunityItem";

interface ChatCommunityProps {
	hostName: string;
	viewerName: string;
	isHidden: boolean;
}

function ChatCommunity({ hostName, viewerName, isHidden }: ChatCommunityProps) {
	const { translations } = useStreamPlayerIntl();

	const [value, setValue] = useState("");
	const [debouncedValue] = useDebounceValue(value, 500);

	const participants = useParticipants();

	const filteredParticipants = useMemo(() => {
		const deduplicatedAdmin = participants.reduce(
			(acc, participant) => {
				const hostAsViewer = `host-${participant.identity}`;

				if (!acc.some((participant) => participant.identity === hostAsViewer)) {
					acc.push(participant);
				}

				return acc;
			},
			[] as (RemoteParticipant | LocalParticipant)[],
		);

		return deduplicatedAdmin.filter((participant) => {
			return participant.name
				?.toLowerCase()
				.includes(debouncedValue.toLowerCase());
		});
	}, [participants, debouncedValue]);

	if (isHidden)
		return (
			<div className="flex flex-1 items-center justify-center">
				<p className="text-sm text-muted-foreground">
					{translations.hiddenCommunity}
				</p>
			</div>
		);

	return (
		<div className="p-4">
			<Input
				onChange={(e) => setValue(e.target.value)}
				placeholder={translations.searchCommunityInputPlaceholder}
				className="border-foreground/10"
			/>
			<ScrollArea className="gap-y-2 mt-4">
				<p className="text-center text-sm text-muted-foreground hidden last:block p-2">
					{translations.searchCommunityNoResults}
				</p>
				{filteredParticipants.map((participant) => (
					<CommunityItem
						key={participant.identity}
						hostName={hostName}
						viewerName={viewerName}
						participantName={participant.name}
						participantIdentity={participant.identity}
					/>
				))}
			</ScrollArea>
		</div>
	);
}

export default ChatCommunity;
