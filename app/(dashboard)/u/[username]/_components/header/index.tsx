import Logo from "@/components/Logo";
import Actions from "./Actions";

async function Header() {
	return (
		<header className="fixed top-0 gap-1 left-0 w-full h-14 z-50 px-2 lg:px-4 flex items-center justify-between shadow-md border-b border-border bg-background">
			<Logo />
			<Actions />
		</header>
	);
}

export default Header;
