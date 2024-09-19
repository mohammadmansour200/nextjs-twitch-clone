"use client";

import Hint from "@/components/Hint";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSidebar } from "@/store/useSidebar";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

interface ToggleProps {
	toggleHint: {
		collapseBtnHint: string;
		expandBtnHint: string;
	};
	hintDir: "right" | "left";
}

function Toggle({ toggleHint, hintDir }: ToggleProps) {
	const { collapsed, onCollapse, onExpand } = useSidebar();

	const label = collapsed
		? toggleHint.expandBtnHint
		: toggleHint.collapseBtnHint;

	return (
		<>
			{collapsed && (
				<div className="hidden lg:flex w-full items-center justify-center p-1 mb-4">
					<Hint asChild label={label} side={hintDir}>
						<Button
							onClick={onExpand}
							className="h-auto p-2 ltr:ml-auto rtl:mr-auto"
							variant="ghost"
						>
							<ArrowRightFromLine className="h-4 w-4 rtl:rotate-180" />
						</Button>
					</Hint>
				</div>
			)}
			{!collapsed && (
				<div className="ps-6 p-1 flex items-center w-full">
					<Hint label={label} asChild side={hintDir}>
						<Button
							onClick={onCollapse}
							className="h-auto p-2 ltr:ml-auto rtl:mr-auto"
							variant="ghost"
						>
							<ArrowLeftFromLine className="h-4 w-4 rtl:rotate-180" />
						</Button>
					</Hint>
				</div>
			)}
		</>
	);
}

export function ToggleSkeleton() {
	return (
		<div className="p-3 pl-6 mb-2 hidden lg:flex items-center justify-between w-full">
			<Skeleton className="h-6 w-6 ltr:ml-auto rtl:mr-auto" />
		</div>
	);
}

export default Toggle;
