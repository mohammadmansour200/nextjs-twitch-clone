"use client";

import { useStreamPlayerIntl } from "../StreamPlayerIntlProvider";
import VerifiedMark from "./VerifiedMark";

interface AboutCardProps {
	hostName: string;
	bio: string | null;
	followedByCount: number;
}

function AboutCard({ hostName, bio, followedByCount }: AboutCardProps) {
	const { translations } = useStreamPlayerIntl();
	return (
		<div className="px-4">
			<div className="group rounded-xl bg-muted p-6 lg:p-10 flex flex-col gap-y-3">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-x-2 font-semibold text-lg lg:text-2xl">
						{translations.aboutCardLabel} {hostName}
						<VerifiedMark />
					</div>
				</div>
				<div className="text-sm text-muted-foreground">
					<span className="font-semibold text-primary">
						{translations.aboutCardFollowers}: {followedByCount}
					</span>
				</div>
				<p className="text-sm" dir="auto">
					{bio || translations.aboutCardNoBio}
				</p>
			</div>
		</div>
	);
}

export default AboutCard;
