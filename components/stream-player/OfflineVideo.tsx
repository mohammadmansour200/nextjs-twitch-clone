import { WifiOff } from "lucide-react";
import { useStreamPlayerIntl } from "../StreamPlayerIntlProvider";

interface OfflineVideoProps {
	username: string;
}

function OfflineVideo({ username }: OfflineVideoProps) {
	const { translations } = useStreamPlayerIntl();
	return (
		<div className="h-full flex flex-col space-y-4 justify-center items-center">
			<WifiOff className="h-10 w-10 text-muted-foreground" />
			<p className="text-muted-foreground">
				{username} {translations.offlineVideoLabel}
			</p>
		</div>
	);
}

export default OfflineVideo;
