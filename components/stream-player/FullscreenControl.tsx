import Hint from "@/components/Hint";
import { Maximize, Minimize } from "lucide-react";
import { useStreamPlayerIntl } from "../StreamPlayerIntlProvider";

interface FullscreenControlProps {
	isFullscreen: boolean;
	onToggle: () => void;
}

function FullscreenControl({ isFullscreen, onToggle }: FullscreenControlProps) {
	const { translations } = useStreamPlayerIntl();

	const Icon = isFullscreen ? Minimize : Maximize;
	const label = isFullscreen
		? translations.exitFullscreen
		: translations.fullscreen;

	return (
		<div className="flex items-center justify-center gap-4">
			<Hint label={label} asChild>
				<button
					className="text-white p-1.5 hover:bg-white/10 rounded-lg"
					type="button"
					onClick={onToggle}
				>
					<Icon className="h-5 w-5" />
				</button>
			</Hint>
		</div>
	);
}

export default FullscreenControl;
