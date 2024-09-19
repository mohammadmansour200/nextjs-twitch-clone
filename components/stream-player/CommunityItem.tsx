"use client";

import { onBlock } from "@/action/block";
import { cn } from "@/lib/cn";
import { stringToColor } from "@/utils/stringToColor";
import { MinusCircle } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import Hint from "../Hint";
import { useStreamPlayerIntl } from "../StreamPlayerIntlProvider";
import { Button } from "../ui/button";

interface CommunityItemProps {
	hostName: string;
	viewerName: string;
	participantName?: string;
	participantIdentity: string;
}

function CommunityItem({
	hostName,
	viewerName,
	participantName,
	participantIdentity,
}: CommunityItemProps) {
	const { translations } = useStreamPlayerIntl();

	const [isPending, startTransition] = useTransition();
	const color = stringToColor(participantName || "");

	const isSelf = participantName === viewerName;
	const isHost = viewerName === hostName;

	function handleBlock() {
		if (!participantName || isSelf || !isHost) return;

		startTransition(() => {
			onBlock(participantIdentity)
				.then((data) =>
					toast.success(
						`${translations.blockSuccess} ${data?.blocked.username}`,
					),
				)
				.catch(() => toast.error(translations.blockError));
		});
	}

	return (
		<div
			className={cn(
				"group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-foreground/5",
				isPending && "opacity-50 pointer-events-none",
			)}
		>
			<p style={{ color }}>{participantName}</p>
			{isHost && !isSelf && (
				<Hint label={translations.blockBtn}>
					<Button
						variant="ghost"
						disabled={isPending}
						onClick={handleBlock}
						className="h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition"
					>
						<MinusCircle className="h-4 w-4 text-muted-foreground" />
					</Button>
				</Hint>
			)}
		</div>
	);
}

export default CommunityItem;
