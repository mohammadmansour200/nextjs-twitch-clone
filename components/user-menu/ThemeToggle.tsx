"use client";

import { Moon, Sun } from "lucide-react";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/cn";
import { useTheme } from "next-themes";

interface ThemeToggleProps {
	className?: string;
	themeToggleText: {
		darkMode: string;
		lightMode: string;
		system: string;
	};
}
export function ThemeToggle({ className, themeToggleText }: ThemeToggleProps) {
	const { setTheme, theme } = useTheme();

	return (
		<div
			className={cn("flex items-center gap-2 rtl:flex-row-reverse", className)}
		>
			<Sun className="h-[1.3rem] w-[1.3rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
			<Moon className="absolute h-[1.3rem] w-[1.3rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
			<Select value={theme} onValueChange={(value) => setTheme(value)}>
				<SelectTrigger className="w-full">
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="light">{themeToggleText.lightMode}</SelectItem>
					<SelectItem value="dark">{themeToggleText.darkMode}</SelectItem>
					<SelectItem value="system">{themeToggleText.system}</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
}
