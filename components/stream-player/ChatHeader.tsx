"use client";

import { useStreamPlayerIntl } from "../StreamPlayerIntlProvider";
import { Skeleton } from "../ui/skeleton";
import ChatToggle from "./ChatToggle";
import VariantToggle from "./VariantToggle";

function ChatHeader() {
	const { translations, direction } = useStreamPlayerIntl();

	return (
		<div className="relative p-3 border-b">
			<div className="absolute ltr:left-2 rtl:right-2 top-2 hidden lg:block">
				<ChatToggle
					hintDir={direction === "ltr" ? "left" : "right"}
					toggleHint={{
						collapseBtnHint: translations.chatCollapseBtnHint,
						expandBtnHint: translations.chatExpandBtnHint,
					}}
				/>
			</div>
			<p className="font-semibold text-priamry text-center">
				{translations.chatHeaderLabel}
			</p>
			<div className="absolute ltr:right-2 rtl:left-2 top-2">
				<VariantToggle />
			</div>
		</div>
	);
}

export default ChatHeader;

export function ChatHeaderSkeleton() {
	return (
		<div className="relative p-3 border-b hidden md:visible">
			<Skeleton className="absolute h-6 w-6 left-3 top-3" />
			<Skeleton className="w-28 h-6 mx-auto" />
		</div>
	);
}
