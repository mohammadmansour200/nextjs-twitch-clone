"use client";

import { cn } from "@/lib/cn";
import { useSidebar } from "@/store/useSidebar";
import { useIsClient } from "usehooks-ts";
import { FollowingSkeleton } from "./Following";
import { RecommendedSkeleton } from "./Recommended";
import { ToggleSkeleton } from "./Toggle";

interface WrapperProps {
	children: React.ReactNode;
}
function Wrapper({ children }: WrapperProps) {
	const { collapsed } = useSidebar();
	const isClient = useIsClient();

	if (!isClient)
		return (
			<aside className="fixed ltr:left-0 rtl:right-0 w-[70px] lg:w-60 flex flex-col h-full bg-background ltr:border-r rtl:border-l border z-50 transition-all">
				<ToggleSkeleton />
				<FollowingSkeleton />
				<RecommendedSkeleton />
			</aside>
		);

	return (
		<aside
			className={cn(
				"fixed ltr:left-0 rtl:right-0 w-60 flex flex-col h-full bg-background ltr:border-r rtl:border-l border z-50 transition-all",
				collapsed && "w-[70px]",
			)}
		>
			{children}
		</aside>
	);
}

export default Wrapper;
