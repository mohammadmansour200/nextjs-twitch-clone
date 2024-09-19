"use client";

import { Separator } from "@/components/ui/separator";
import { Pencil } from "lucide-react";
import Image from "next/image";
import { useStreamPlayerIntl } from "../StreamPlayerIntlProvider";
import InfoModal from "./InfoModal";

interface InfoCardProps {
	hostIdentity: string;
	viewerIdentity: string;
	name: string;
	thumbnailUrl: string | null;
}

function InfoCard({
	hostIdentity,
	viewerIdentity,
	name,
	thumbnailUrl,
}: InfoCardProps) {
	const { translations } = useStreamPlayerIntl();

	const hostAsViewer = `host-${hostIdentity}`;
	const isHost = viewerIdentity === hostAsViewer;

	if (!isHost) return null;

	return (
		<div className="px-4">
			<div className="rounded-xl bg-muted">
				<div className="flex items-center gap-x-2.5 p-4">
					<div className="rounded-md bg-foreground p-2 h-auto w-auto">
						<Pencil className="h-5 w-5 text-background" />
					</div>
					<div>
						<h2 className="text-sm lg:text-lg font-semibold capitalize">
							{translations.editStream}
						</h2>
					</div>
					<InfoModal initialName={name} />
				</div>
				<Separator />
				<div className="p-4 lg:p-6 space-y-4">
					<div>
						<h3 className="text-sm text-muted-foreground mb-2">
							{translations.infoName}
						</h3>
						<p className="text-sm font-semibold" dir="auto">
							{name}
						</p>
					</div>
					<div>
						<h3 className="text-sm text-muted-foreground mb-2">
							{translations.infoThumbnail}
						</h3>
						{thumbnailUrl && (
							<div className="relative aspect-video rounded-md overflow-hidden w-[200px] border border-foreground/10">
								<Image
									fill
									src={thumbnailUrl}
									alt={name}
									className="object-cover"
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default InfoCard;
