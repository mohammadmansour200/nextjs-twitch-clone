"use client";

import { changeBio } from "@/action/user";
import type { Session } from "next-auth";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface BioSectionProps {
	session: Session | null;
	bioSectionText: {
		bioSectionTitle: string;
		changeBioBtn: string;
		changeBioSuccess: string;
		changeBioError: string;
	};
}
export default function BioSection({
	session,
	bioSectionText,
}: BioSectionProps) {
	const [isPending, startTransition] = useTransition();
	const [bioInputValue, setBioInputValue] = useState(session?.user?.bio || "");

	const changeBioWithData = changeBio.bind(
		null,
		session?.user?.userId as string,
	);

	return (
		<section>
			<h2 className="font-medium">{bioSectionText.bioSectionTitle}</h2>
			<hr className="mb-2" />
			<form
				action={(formData: FormData) => {
					startTransition(async () => {
						await changeBioWithData(formData)
							.then(() => toast.success(bioSectionText.changeBioSuccess))
							.catch(() => toast.error(bioSectionText.changeBioError));
					});
				}}
			>
				<div className="flex items-center flex-col gap-2 ml-3">
					<Textarea
						dir="auto"
						name="bio"
						disabled={isPending}
						onChange={(e) => setBioInputValue(e.target.value)}
						defaultValue={session?.user?.bio || ""}
					/>
					<Button
						disabled={bioInputValue === session?.user?.bio || isPending}
						type="submit"
						className="items-center w-full"
						variant="ghost"
					>
						<p className="text-blue-600 font-semibold">
							{bioSectionText.changeBioBtn}
						</p>
					</Button>
				</div>
			</form>
		</section>
	);
}
