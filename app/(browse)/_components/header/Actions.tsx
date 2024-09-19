import { getDictionary } from "@/app/dictionaries";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LanguageSelect from "@/components/user-menu/LanguageSelect";
import { ThemeToggle } from "@/components/user-menu/ThemeToggle";
import UserMenu from "@/components/user-menu/UserMenu";
import { auth } from "@/lib/auth";
import { getLang } from "@/utils/getLang";
import { MoreVertical } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";

async function Actions() {
	const session = await auth();
	const lang = getLang(cookies());
	const dict = await getDictionary(lang);
	return (
		<div className="flex items-center justify-end gap-x-2 ms-4 lg:ms-0">
			{!session ? (
				<div className="flex items-center gap-2">
					<DropdownMenu>
						<DropdownMenuTrigger className="rounded-full p-1 hover:bg-muted transition-all">
							<MoreVertical />
						</DropdownMenuTrigger>
						<DropdownMenuContent className="p-4 flex flex-col gap-2">
							<ThemeToggle
								themeToggleText={dict.header.manageAccountModal.themeSelect}
							/>
							<LanguageSelect lang={lang} />
						</DropdownMenuContent>
					</DropdownMenu>
					<Link href="/login">
						<Button size="sm">{dict.header.loginBtn}</Button>
					</Link>
				</div>
			) : (
				<UserMenu />
			)}
		</div>
	);
}

export default Actions;
