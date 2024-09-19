"use client";

import { updateStream } from "@/action/stream";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useTransition } from "react";
import { toast } from "sonner";

interface ToggleCardProps {
	value: boolean;
	field: "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly";
	label: string;
	updateText: { settingsUpdateError: string; settingsUpdateSuccess: string };
}

function ToggleCard({
	label,
	value = false,
	field,
	updateText,
}: ToggleCardProps) {
	const [isPending, startTransition] = useTransition();

	function onChange(checked: boolean) {
		startTransition(() => {
			updateStream({ [field]: checked })
				.then(() => toast.success(updateText.settingsUpdateSuccess))
				.catch(() => toast.error(updateText.settingsUpdateError));
		});
	}

	return (
		<div className="rounded-xl bg-muted p-6">
			<div className="flex items-center justify-between">
				<p className="font-semibold shrink-0">{label}</p>
				<div className="space-y-2">
					<Switch
						onCheckedChange={onChange}
						disabled={isPending}
						checked={value}
					>
						{value ? "On" : "Off"}
					</Switch>
				</div>
			</div>
		</div>
	);
}

export default ToggleCard;

export function ToggleCardSkeleton() {
	return <Skeleton className="rounded-xl p-10 w-full" />;
}
