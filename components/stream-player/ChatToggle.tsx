"use client";

import Hint from "@/components/Hint";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useChatSidebar } from "@/store/useChatSidebar";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

interface ToggleProps {
	toggleHint: {
		collapseBtnHint: string;
		expandBtnHint: string;
	};
	hintDir: "right" | "left";
}

function ChatToggle({ toggleHint, hintDir }: ToggleProps) {
	const { collapsed, onCollapse, onExpand } = useChatSidebar();

	const label = collapsed
		? toggleHint.expandBtnHint
		: toggleHint.collapseBtnHint;

	const Icon = collapsed ? ArrowLeftFromLine : ArrowRightFromLine;

	function onToggle() {
		collapsed ? onExpand() : onCollapse();
	}

	return (
		<Hint asChild label={label} side={hintDir}>
			<Button
				onClick={onToggle}
				className="h-auto p-2 hover:bg-foreground/10 hover:text-primary bg-transparent"
				variant="ghost"
			>
				<Icon className="h-4 w-4 rtl:rotate-180" />
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

export default ChatToggle;
