"use client";

import { deleteUser } from "@/action/user";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";

interface DangerSectionProps {
	dangerSectionText: {
		dangerSectionTitle: string;
		deleteAccountBtn: string;
		deleteAccountBtnDescription: string;
	};
}
export default function DangerSection({
	dangerSectionText,
}: DangerSectionProps) {
	const [isPending, startTransition] = useTransition();

	function onDeleteUserBtnClick() {
		startTransition(() => {
			deleteUser();
		});
	}

	return (
		<section>
			<h2 className="font-medium">{dangerSectionText.dangerSectionTitle}</h2>
			<hr className="mb-2" />

			<div className="flex items-center gap-2 ml-3">
				<div className="flex flex-col flex-grow">
					<span className="font-medium">
						{dangerSectionText.deleteAccountBtn}
					</span>
					<span className="text-sm text-muted-foreground">
						{dangerSectionText.deleteAccountBtnDescription}
					</span>
				</div>
				<Button
					disabled={isPending}
					onClick={onDeleteUserBtnClick}
					className="items-center"
					variant="destructive"
				>
					{dangerSectionText.deleteAccountBtn}
				</Button>
			</div>
		</section>
	);
}
