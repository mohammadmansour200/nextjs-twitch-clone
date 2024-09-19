import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

interface HintProps {
	label: string;
	children: React.ReactNode;
	asChild?: boolean;
	side?: "top" | "bottom" | "left" | "right";
	align?: "end" | "center" | "start";
}

function Hint({ label, children, asChild, side, align }: HintProps) {
	return (
		<TooltipProvider>
			<Tooltip delayDuration={50}>
				<TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
				<TooltipContent
					className="text-background bg-foreground"
					side={side}
					align={align}
				>
					<p className="font-semibold">{label}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}

export default Hint;
