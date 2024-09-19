import { getDictionary } from "@/app/dictionaries";
import Logo from "@/components/Logo";
import { getLang } from "@/utils/getLang";
import { cookies } from "next/headers";
import Actions from "./Actions";
import SearchBar from "./SearchBar";

async function Header() {
	const lang = getLang(cookies());

	const dict = await getDictionary(lang);

	return (
		<header className="fixed top-0 gap-1 left-0 w-full h-14 z-50 px-2 lg:px-4 flex items-center justify-between shadow-md border-b border-border bg-background">
			<Logo />
			<SearchBar searchBarPlaceholder={dict.header.searchBarPlaceholder} />
			<Actions />
		</header>
	);
}

export default Header;
