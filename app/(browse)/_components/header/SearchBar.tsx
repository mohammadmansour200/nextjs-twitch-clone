"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { useState } from "react";

interface SearchBarProps {
	searchBarPlaceholder: string;
}

function SearchBar({ searchBarPlaceholder }: SearchBarProps) {
	const router = useRouter();
	const [query, setQuery] = useState("");

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (!query) return;

		const url = qs.stringifyUrl(
			{
				url: "/search",
				query: { term: query },
			},
			{ skipEmptyString: true },
		);

		router.push(url);
	}

	return (
		<form
			onSubmit={onSubmit}
			className="relative w-full lg:w-[400px] flex items-center"
		>
			<Input
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder={searchBarPlaceholder}
				className="ltr:rounded-r-none rtl:rounded-l-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
			/>
			{query && (
				<X
					onClick={() => setQuery("")}
					className="absolute top-2.5 ltr:right-14 rtl:right-[20.5rem] h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition"
				/>
			)}
			<Button
				size="sm"
				variant="secondary"
				className="ltr:rounded-l-none rtl:rounded-r-none h-10"
				type="submit"
			>
				<SearchIcon className="h-5 w-5 text-muted-foreground" />
			</Button>
		</form>
	);
}

export default SearchBar;
