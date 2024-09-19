"use client";

import { onUnblock } from "@/action/block";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface UnblockButtonProps {
	userId: string;
}

function UnblockButton({ userId }: UnblockButtonProps) {
	const [isPending, startTransition] = useTransition();

	function onClick() {
		startTransition(() => {
			onUnblock(userId)
				.then(() => toast.success("User blocked"))
				.catch(() => toast.error("Something went wrong"));
		});
	}

	return (
		<Button disabled={isPending} onClick={onClick} size="sm">
			Unblock
		</Button>
	);
}

export default UnblockButton;
