"use client";

import { cn } from "@/lib/cn";
import { useState } from "react";
import { useStreamPlayerIntl } from "../StreamPlayerIntlProvider";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";
import ChatInfo from "./ChatInfo";

interface ChatFormProps {
	onSubmit: () => void;
	value: string;
	onChange: (value: string) => void;
	isHidden: boolean;
	isFollowersOnly: boolean;
	isFollowing: boolean;
	isDelayed: boolean;
}

export function ChatForm({
	onSubmit,
	value,
	onChange,
	isHidden,
	isFollowersOnly,
	isFollowing,
	isDelayed,
}: ChatFormProps) {
	const { translations } = useStreamPlayerIntl();

	const [isDelayBlocked, setIsDelayBlocked] = useState(false);

	const isFollowersOnlyAndNotFollowing = isFollowersOnly && !isFollowing;

	const isDisabled =
		isHidden || isDelayBlocked || isFollowersOnlyAndNotFollowing;

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		e.stopPropagation();

		if (!value || isDisabled) return;

		if (isDelayed && !isDelayBlocked) {
			setIsDelayBlocked(true);
			setTimeout(() => {
				setIsDelayBlocked(false);
				onSubmit();
			}, 3000);
		} else {
			onSubmit();
		}
	}

	if (isHidden) return null;

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col items-center gap-y-4 p-3"
		>
			<div className="w-full">
				<ChatInfo isDelayed={isDelayed} isFollowersOnly={isFollowersOnly} />
				<Input
					onChange={(e) => onChange(e.target.value)}
					disabled={isDisabled}
					value={value}
					placeholder={translations.chatInputPlaceholder}
					className={cn(
						"border-foreground/10",
						(isFollowersOnly || isDelayed) && "rounded-t-none",
					)}
				/>
			</div>
			<div className="me-auto">
				<Button type="submit" size="sm" disabled={isDisabled}>
					{translations.chatInputSend}
				</Button>
			</div>
		</form>
	);
}

export function ChatFormSkeleton() {
	return (
		<div className="flex flex-col items-center gap-y-4 p-3">
			<Skeleton className="w-full h-10" />
			<div className="flex items-center gap-x-2 me-auto">
				<Skeleton className="h-7 w-7" />
				<Skeleton className="h-7 w-12" />
			</div>
		</div>
	);
}
