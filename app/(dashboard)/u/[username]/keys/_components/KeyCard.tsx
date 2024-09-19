"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import CopyButton from "./CopyButton";

interface KeyCardProps {
	value: string | null;
	hideText: string;
	showText: string;
}
function KeyCard({ value, hideText, showText }: KeyCardProps) {
	const [show, setShow] = useState(false);

	return (
		<div className="rounded-xl bg-muted p-6">
			<div className="flex items-center gap-x-10">
				<p className="font-semibold shrink-0">Stream key</p>
				<div className="space-y-2 w-full">
					<div className="w-full flex items-center gap-x-2">
						<Input
							type={show ? "text" : "password"}
							value={value || ""}
							disabled
							placeholder="Stream key"
						/>
						<CopyButton value={value || ""} />
					</div>
					<Button onClick={() => setShow(!show)} size="sm" variant="link">
						{show ? hideText : showText}
					</Button>
				</div>
			</div>
		</div>
	);
}

export default KeyCard;
