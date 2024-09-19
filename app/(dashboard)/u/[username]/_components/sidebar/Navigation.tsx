"use client";

import { Fullscreen, KeyRound, MessageSquare, Users } from "lucide-react";
import type { User } from "next-auth";
import { usePathname } from "next/navigation";
import NavItem from "./NavItem";

interface NavigationProps {
	user: User;
	dashboardSidebarText: {
		stream: string;
		keys: string;
		chat: string;
		community: string;
	};
}

function Navigation({ user, dashboardSidebarText }: NavigationProps) {
	const pathname = usePathname();

	const routes = [
		{
			label: dashboardSidebarText.stream,
			href: `/u/${user?.username}`,
			icon: Fullscreen,
		},
		{
			label: dashboardSidebarText.keys,
			href: `/u/${user?.username}/keys`,
			icon: KeyRound,
		},
		{
			label: dashboardSidebarText.chat,
			href: `/u/${user?.username}/chat`,
			icon: MessageSquare,
		},
		{
			label: dashboardSidebarText.community,
			href: `/u/${user?.username}/community`,
			icon: Users,
		},
	];

	return (
		<ul className="space-y-2 px-2 pt-4 lg:pt-0">
			{routes.map((route) => (
				<NavItem
					key={route.href}
					label={route.label}
					href={route.href}
					icon={route.icon}
					isActive={pathname === route.href}
				/>
			))}
		</ul>
	);
}

export default Navigation;
