"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/cn";
import { useSidebar } from "@/store/useSidebar";
import { useIsClient } from "usehooks-ts";

interface WrapperProps {
	children: React.ReactNode;
}
function Wrapper({ children }: WrapperProps) {
	const isClient = useIsClient();
	const { collapsed } = useSidebar();

	if (!isClient)
		return (
			<aside className="fixed ltr:left-0 rtl:right-0 w-[70px] lg:w-60 flex flex-col h-full bg-background ltr:border-r rtl:border-l border z-50 transition-all">
				<ToggleSkeleton />
				<NavItemSkeleton />
				<NavItemSkeleton />
				<NavItemSkeleton />
				<NavItemSkeleton />
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

export function ToggleSkeleton() {
	return (
		<div className="p-3 pl-6 mb-2 hidden lg:flex items-center justify-between w-full">
			<Skeleton className="h-6 w-12" />
			<Skeleton className="h-6 w-6 ltr:ml-auto rtl:mr-auto" />
		</div>
	);
}

export function NavItemSkeleton() {
	return (
		<li className="flex items-center gap-x-4 px-3 py-2">
			<div className="flex-1">
				<Skeleton className="h-10" />
			</div>
		</li>
	);
}
