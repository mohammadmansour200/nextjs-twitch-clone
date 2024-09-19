import { getDictionary } from "@/app/dictionaries";
import { Skeleton } from "@/components/ui/skeleton";
import { getStreamsFromSearch } from "@/services/stream-service";
import { getLang } from "@/utils/getLang";
import { cookies } from "next/headers";
import ResultCard, { ResultCardSkeleton } from "./ResultCard";

interface ResultsProps {
	term?: string;
}

async function Results({ term }: ResultsProps) {
	const lang = getLang(cookies());
	const dict = await getDictionary(lang);

	const data = await getStreamsFromSearch(term);

	return (
		<div>
			<h2 className="text-lg font-semibold mb-4">
				{dict.search.header} "{term}"
			</h2>
			{data.length === 0 && (
				<p className="text-muted-foreground text-sm">{dict.search.noStreams}</p>
			)}
			<div className="flex flex-col gap-y-4">
				{data.map((stream) => (
					<ResultCard key={stream.id} data={stream} />
				))}
			</div>
		</div>
	);
}

export default Results;

export function ResultsSkeleton() {
	return (
		<div>
			<Skeleton className="h-8 w-[290px] mb-4" />
			<div className="flex flex-col gap-y-4">
				<ResultCardSkeleton />
				<ResultCardSkeleton />
				<ResultCardSkeleton />
			</div>
		</div>
	);
}
