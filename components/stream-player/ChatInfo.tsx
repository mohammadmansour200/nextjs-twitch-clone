import { Info } from "lucide-react";
import { useMemo } from "react";
import Hint from "../Hint";
import { useStreamPlayerIntl } from "../StreamPlayerIntlProvider";

interface ChatInfoProps {
	isDelayed: boolean;
	isFollowersOnly: boolean;
}

export function ChatInfo({ isDelayed, isFollowersOnly }: ChatInfoProps) {
	const { translations } = useStreamPlayerIntl();

	const hint = useMemo(() => {
		if (isFollowersOnly && !isDelayed)
			return translations.onlyFollowersChatHint;

		if (!isFollowersOnly && isDelayed) return translations.delayedChatHint;

		if (isFollowersOnly && isDelayed)
			return translations.onlyFollowersAndIsDelayedChatHint;

		return "";
	}, [
		isDelayed,
		isFollowersOnly,
		translations.onlyFollowersAndIsDelayedChatHint,
		translations.delayedChatHint,
		translations.onlyFollowersChatHint,
	]);

	const label = useMemo(() => {
		if (isFollowersOnly && !isDelayed)
			return translations.onlyFollowersChatLabel;

		if (!isFollowersOnly && isDelayed) return translations.delayedChatLabel;

		if (isFollowersOnly && isDelayed)
			return translations.onlyFollowersAndIsDelayedChatLabel;

		return "";
	}, [
		isDelayed,
		isFollowersOnly,
		translations.onlyFollowersAndIsDelayedChatLabel,
		translations.delayedChatLabel,
		translations.onlyFollowersChatLabel,
	]);

	if (!isDelayed && !isFollowersOnly) return null;

	return (
		<div className="p-2 text-muted-foreground bg-foreground/5 border border-foreground/10 w-full rounded-t-md flex items-center gap-x-2">
			<Hint label={hint}>
				<Info className="h-4 w-4" />
			</Hint>
			<p className="text-xs font-semibold">{label}</p>
		</div>
	);
}

export default ChatInfo;
