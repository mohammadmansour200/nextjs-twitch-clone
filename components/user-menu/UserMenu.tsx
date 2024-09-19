import { auth } from "@/lib/auth";
import { getLang } from "@/utils/getLang";

import { cookies } from "next/headers";
import Link from "next/link";

import { signOutAction } from "@/action/oauth";
import { getDictionary } from "@/app/dictionaries";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import BioSection from "./BioSection";
import DangerSection from "./DangerSection";
import LanguageSelect from "./LanguageSelect";
import { ThemeToggle } from "./ThemeToggle";
import UsernameSection from "./UsernameSection";

async function UserMenu() {
	const lang = getLang(cookies());
	const dict = await getDictionary(lang);
	const session = await auth();

	return (
		<Dialog>
			<DropdownMenu>
				<DropdownMenuTrigger className="rounded-full w-[2rem]">
					{" "}
					<img
						className="rounded-full h-8 w-8 block"
						width="2rem"
						src={session?.user?.image ?? ""}
						alt={session?.user?.name ?? ""}
						referrerPolicy="no-referrer"
					/>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="p-4 w-[200px] flex flex-col gap-2">
					<Link
						href={`/u/${session?.user?.username}`}
						className="flex ltr:flex-row rtl:flex-row-reverse items-center gap-2 hover:bg-muted p-2 rounded-md"
					>
						<img
							className="h-8 rounded-full w-8"
							width="2rem"
							src={session?.user?.image ?? ""}
							alt={session?.user?.name ?? ""}
							referrerPolicy="no-referrer"
						/>
						<div className="flex flex-col">
							<span className="text-sm">{session?.user?.name}</span>
							<span className="text-sm text-muted-foreground">
								{session?.user?.username}
							</span>
						</div>
					</Link>
					<DialogTrigger asChild>
						<DropdownMenuItem
							dir="auto"
							className="text-muted-foreground gap-3"
						>
							{/* biome-ignore lint/a11y/noSvgWithoutTitle: title is useless in this case */}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 16 16"
								width="15"
							>
								<path
									fill="currentColor"
									fillRule="evenodd"
									d="M9.49 1.17c-.38-1.56-2.6-1.56-2.98 0a1.53 1.53 0 0 1-2.29.95c-1.37-.84-2.94.73-2.1 2.1.54.89.06 2.05-.95 2.3-1.56.37-1.56 2.6 0 2.97a1.53 1.53 0 0 1 .95 2.29c-.84 1.37.73 2.94 2.1 2.1a1.53 1.53 0 0 1 2.3.95c.37 1.56 2.6 1.56 2.97 0a1.53 1.53 0 0 1 2.29-.95c1.37.84 2.94-.73 2.1-2.1a1.53 1.53 0 0 1 .95-2.3c1.56-.37 1.56-2.6 0-2.97a1.53 1.53 0 0 1-.95-2.29c.84-1.37-.73-2.94-2.1-2.1a1.53 1.53 0 0 1-2.3-.95ZM8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
									clipRule="evenodd"
								/>
							</svg>
							<p>{dict.header.userMenu.manageAccount}</p>
						</DropdownMenuItem>
					</DialogTrigger>
					<form action={signOutAction}>
						<button type="submit" className="w-full">
							<DropdownMenuItem
								dir="auto"
								className="text-muted-foreground gap-3"
							>
								{/* biome-ignore lint/a11y/noSvgWithoutTitle: title is useless in this case */}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 15 16"
									width="15"
								>
									<path
										fill="currentColor"
										d="M1 0a1 1 0 0 0-1 1v12a1 1 0 1 0 2 0V1a1 1 0 0 0-1-1Zm10.3 9.3a1 1 0 0 0 1.4 1.4l3-3a1 1 0 0 0 0-1.4l-3-3a1 1 0 1 0-1.4 1.4L12.58 6H5a1 1 0 1 0 0 2h7.59l-1.3 1.3Z"
									/>
								</svg>
								<p>{dict.header.userMenu.signOut}</p>
							</DropdownMenuItem>
						</button>
					</form>
					<hr />
					<ThemeToggle
						themeToggleText={dict.header.manageAccountModal.themeSelect}
					/>
					<LanguageSelect lang={lang} />
				</DropdownMenuContent>
			</DropdownMenu>
			<DialogContent>
				<DialogHeader className="mb-3">
					<DialogTitle className="text-3xl text-center">
						{dict.header.manageAccountModal.title}
					</DialogTitle>
					<DialogDescription className="text-center">
						{dict.header.manageAccountModal.description}
					</DialogDescription>
				</DialogHeader>
				<UsernameSection
					usernameSectionText={dict.header.manageAccountModal.usernameSection}
					session={session}
				/>
				<BioSection
					bioSectionText={dict.header.manageAccountModal.bioSection}
					session={session}
				/>
				<DangerSection
					dangerSectionText={dict.header.manageAccountModal.dangerSection}
				/>
			</DialogContent>
		</Dialog>
	);
}

export default UserMenu;
