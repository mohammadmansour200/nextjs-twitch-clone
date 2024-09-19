import { getDictionary } from "@/app/dictionaries";
import { Skeleton } from "@/components/ui/skeleton";
import { getStreams } from "@/services/stream-service";
import { getLang } from "@/utils/getLang";
import { cookies } from "next/headers";
import ResultCard, { ResultCardSkeleton } from "./ResultCard";

async function Results() {
	const lang = getLang(cookies());
	const dict = await getDictionary(lang);

	const data = await getStreams();

	return (
		<div>
			<h2 className="text-lg font-semibold mb-4">{dict.home.header}</h2>
			{data.length === 0 && (
				<p className="text-muted-foreground text-sm">{dict.home.noStreams}</p>
			)}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
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
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
				<ResultCardSkeleton />
				<ResultCardSkeleton />
				<ResultCardSkeleton />
				<ResultCardSkeleton />
			</div>
		</div>
	);
}
