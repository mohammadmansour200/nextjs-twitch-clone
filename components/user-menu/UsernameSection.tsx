"use client";

import { changeUsername } from "@/action/user";
import type { Session } from "next-auth";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface UsernameSectionProps {
	session: Session | null;
	usernameSectionText: {
		usernameSectionTitle: string;
		changeUsernameBtn: string;
		changeUsernameSuccess: string;
		changeUsernameError: string;
	};
}
export default function UsernameSection({
	session,
	usernameSectionText,
}: UsernameSectionProps) {
	const [isPending, startTransition] = useTransition();
	const [usernameInputValue, setUsernameInputValue] = useState(
		session?.user?.username || "",
	);

	const changeUsernameWithData = changeUsername.bind(
		null,
		session?.user?.userId as string,
	);

	return (
		<section>
			<h2 className="font-medium">
				{usernameSectionText.usernameSectionTitle}
			</h2>
			<hr className="mb-2" />
			<form
				action={(formData: FormData) => {
					startTransition(async () => {
						await changeUsernameWithData(formData)
							.then(() =>
								toast.success(usernameSectionText.changeUsernameSuccess),
							)
							.catch(() =>
								toast.error(usernameSectionText.changeUsernameError),
							);
					});
				}}
			>
				<div className="flex items-center gap-2 ml-3">
					<Input
						name="username"
						disabled={isPending}
						type="text"
						maxLength={14}
						minLength={2}
						onChange={(e) => setUsernameInputValue(e.target.value)}
						className="flex-grow"
						defaultValue={session?.user?.username}
					/>
					<Button
						disabled={
							usernameInputValue.length < 2 ||
							usernameInputValue === session?.user?.username ||
							isPending
						}
						type="submit"
						className="items-center"
						variant="ghost"
					>
						<p className="text-blue-600 font-semibold">
							{usernameSectionText.changeUsernameBtn}
						</p>
					</Button>
				</div>
			</form>
		</section>
	);
}
