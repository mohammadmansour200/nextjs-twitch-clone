"use client";
import { cn } from "@/lib/cn";
import { useSidebar } from "@/store/useSidebar";
import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

interface MainProps {
	children: React.ReactNode;
}
function Main({ children }: MainProps) {
	const matches = useMediaQuery("(max-width: 1024px)");
	const { onCollapse, onExpand, collapsed } = useSidebar();

	useEffect(() => {
		if (matches) {
			onCollapse();
		} else {
			onExpand();
		}
	}, [matches, onCollapse, onExpand]);

	return (
		<main className={cn("flex-1 ms-[70px]", !collapsed ? "lg:ms-60" : "")}>
			{children}
		</main>
	);
}

export default Main;
