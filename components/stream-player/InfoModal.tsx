"use client";

import { updateStream } from "@/action/stream";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadDropzone } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { useStreamPlayerIntl } from "../StreamPlayerIntlProvider";

interface InfoModalProps {
	initialName: string;
}

function InfoModal({ initialName }: InfoModalProps) {
	const { translations } = useStreamPlayerIntl();

	const [name, setName] = useState(initialName);

	const closeRef = useRef<React.ElementRef<"button">>(null);
	const [isPending, startTransition] = useTransition();

	const router = useRouter();

	function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		startTransition(() => {
			updateStream({ name })
				.then(() => {
					toast.success(translations.editStreamSuccess);
					closeRef?.current?.click();
				})
				.catch(() => toast.error(translations.editStreamError));
		});
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="link" size="sm" className="ms-auto">
					{translations.editBtn}
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{translations.editStream}</DialogTitle>
				</DialogHeader>
				<form onSubmit={onFormSubmit} className="space-y-14">
					<div className="space-y-2">
						<Label>{translations.infoName}</Label>
						<Input
							disabled={isPending}
							onChange={(e) => setName(e.target.value)}
							placeholder={translations.infoName}
							defaultValue={name}
						/>
					</div>
					<div className="space-y-2">
						<Label>{translations.infoThumbnail}</Label>
						<div className="rounded-xl border outline-dashed outline-muted">
							<UploadDropzone
								endpoint="thumbnailUploader"
								appearance={{
									label: {
										color: "hsl(var(--foreground))",
									},
									allowedContent: {
										color: "hsl(var(--foreground))",
									},
								}}
								onClientUploadComplete={() => {
									closeRef.current?.click();

									router.refresh();
								}}
							/>
						</div>
					</div>

					<div className="flex justify-between">
						<DialogClose ref={closeRef} asChild>
							<Button disabled={isPending} type="button" variant="ghost">
								{translations.editCancel}
							</Button>
						</DialogClose>
						<Button disabled={isPending} type="submit">
							{translations.editSave}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}

export default InfoModal;
