"use client";

import { createIngress } from "@/action/ingress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { IngressInput } from "livekit-server-sdk";
import { AlertTriangle } from "lucide-react";
import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";

const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

interface ConnectModalProps {
	generateModalText: {
		title: string;
		showKey: string;
		hideKey: string;
		generate: string;
		warning: string;
		warningDesc: string;
		cancelBtn: string;
		generateBtn: string;
		generateSuccess: string;
		generateError: string;
	};
}

function ConnectModal({ generateModalText }: ConnectModalProps) {
	const closeRef = useRef<React.ElementRef<"button">>(null);

	const [isPending, startTransition] = useTransition();
	const [ingressType, setIngressType] = useState<typeof RTMP | typeof WHIP>(
		RTMP,
	);

	async function onSubmit() {
		startTransition(() => {
			createIngress(Number.parseInt(ingressType))
				.then(() => {
					closeRef.current?.click();
					toast.success(generateModalText.generateSuccess);
				})
				.catch(() => toast.error(generateModalText.generateError));
		});
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>{generateModalText.generate}</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="text-center">
						{generateModalText.generate}
					</DialogTitle>
				</DialogHeader>
				<Select
					disabled={isPending}
					value={ingressType}
					onValueChange={(value) => setIngressType(value)}
				>
					<SelectTrigger className="w-full">
						<SelectValue placeholder="Ingress Type" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value={RTMP}>RTMP</SelectItem>
						<SelectItem value={WHIP}>WHIP</SelectItem>
					</SelectContent>
				</Select>
				<Alert>
					<AlertTriangle className="w-4 h-4" />
					<AlertTitle>{generateModalText.warning}</AlertTitle>
					<AlertDescription>{generateModalText.warningDesc}</AlertDescription>
				</Alert>
				<div className="flex justify-between">
					<DialogClose ref={closeRef} asChild>
						<Button variant="ghost">{generateModalText.cancelBtn}</Button>
					</DialogClose>
					<Button disabled={isPending} onClick={onSubmit}>
						{generateModalText.generateBtn}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default ConnectModal;
