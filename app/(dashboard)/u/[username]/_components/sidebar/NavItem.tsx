"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { useSidebar } from "@/store/useSidebar";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

interface NavItemProps {
	label: string;
	href: string;
	icon: LucideIcon;
	isActive: boolean;
}

function NavItem({ label, href, icon: Icon, isActive }: NavItemProps) {
	const { collapsed } = useSidebar();
	return (
		<Button
			asChild
			variant="ghost"
			className={cn(
				"w-full h-12 ",
				collapsed ? "justify-center" : "justify-start",
				isActive && "bg-accent",
			)}
		>
			<Link href={href}>
				<div className="flex items-center gap-x-4">
					<Icon className={cn("h-4 w-4", collapsed ? "me-0" : "mr-2")} />
					{!collapsed && <span>{label}</span>}
				</div>
			</Link>
		</Button>
	);
}

export default NavItem;
