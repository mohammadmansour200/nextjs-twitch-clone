"use client";

import Hint from "@/components/Hint";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/store/useSidebar";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

interface ToggleProps {
	toggleText: {
		collapseBtnHint: string;
		expandBtnHint: string;
		dashboard: string;
	};
	hintDir: "right" | "left";
}

function Toggle({ toggleText, hintDir }: ToggleProps) {
	const { collapsed, onCollapse, onExpand } = useSidebar();

	const label = collapsed
		? toggleText.expandBtnHint
		: toggleText.collapseBtnHint;

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
					<p className="font-semibold text-primary text-nowrap">
						{toggleText.dashboard}
					</p>
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

export default Toggle;
