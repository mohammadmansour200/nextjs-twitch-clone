import Hint from "@/components/Hint";
import { Volume1, Volume2, VolumeX } from "lucide-react";
import { useStreamPlayerIntl } from "../StreamPlayerIntlProvider";
import { Slider } from "../ui/slider";

interface VolumeControlProps {
	onToggle: () => void;
	onChange: (value: number) => void;
	value: number;
}

function VolumeControl({ onToggle, onChange, value }: VolumeControlProps) {
	const { translations } = useStreamPlayerIntl();

	const isMuted = value === 0;
	const isAboveHalf = value > 50;
	const Icon = isMuted ? VolumeX : isAboveHalf ? Volume2 : Volume1;
	const label = isMuted ? translations.unmute : translations.mute;

	return (
		<div className="flex items-center gap-2">
			<Hint label={label} asChild>
				<button
					className="text-white p-1.5 hover:bg-white/10 rounded-lg"
					type="button"
					onClick={onToggle}
				>
					<Icon className="h-6 w-6" />
				</button>
			</Hint>
			<Slider
				className="w-[8rem] cursor-pointer"
				onValueChange={(values) => onChange(values[0])}
				value={[value]}
				max={100}
				step={1}
			/>
		</div>
	);
}

export default VolumeControl;
