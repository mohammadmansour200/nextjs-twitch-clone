"use client";

import Hint from "@/components/Hint";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChatVariant, useChatSidebar } from "@/store/useChatSidebar";
import { MessageSquare, Users } from "lucide-react";
import { useStreamPlayerIntl } from "../StreamPlayerIntlProvider";

function VariantToggle() {
	const { direction, translations } = useStreamPlayerIntl();
	const { variant, onChangeVariant } = useChatSidebar();

	const isChat = variant === ChatVariant.CHAT;

	const Icon = isChat ? Users : MessageSquare;

	function onToggle() {
		const newVariant = isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT;
		onChangeVariant(newVariant);
	}

	const label = isChat
		? translations.variationCommunityHint
		: translations.variationChatHint;

	return (
		<Hint asChild label={label} side={direction === "rtl" ? "right" : "left"}>
			<Button
				onClick={onToggle}
				className="h-auto p-2 hover:bg-foreground/10 hover:text-primary bg-transparent"
				variant="ghost"
			>
				<Icon className="h-4 w-4" />
			</Button>
		</Hint>
	);
}

export function ToggleSkeleton() {
	return (
		<div className="p-3 pl-6 mb-2 hidden lg:flex items-center justify-between w-full">
			<Skeleton className="h-6 w-6 ltr:ml-auto rtl:mr-auto" />
		</div>
	);
}

export default VariantToggle;
