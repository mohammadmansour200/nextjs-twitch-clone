import { Skeleton } from "@/components/ui/skeleton";
import { ToggleCardSkeleton } from "./_components/ToggleCard";

function ChatLoading() {
	return (
		<div className="space-y-4 p-3">
			<Skeleton className="h-10 w-[200px]" />
			<div className="space-y-4">
				<ToggleCardSkeleton />
				<ToggleCardSkeleton />
				<ToggleCardSkeleton />
			</div>
		</div>
	);
}

export default ChatLoading;
