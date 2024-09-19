import { getDictionary } from "@/app/dictionaries";
import Logo from "@/components/Logo";
import { getLang } from "@/utils/getLang";
import { cookies } from "next/headers";
import SignInButton from "./_components/SignInButton";

export const metadata = {
	title: "Login",
	description: "Login for the full experience",
};

export default async function Page() {
	const lang = getLang(cookies());
	const dict = await getDictionary(lang);
	return (
		<div className="flex justify-center flex-col items-center gap-5">
			<Logo />
			<div className="flex flex-col gap-4 border border-border px-10 py-4 rounded-md">
				<div>
					<h1 className="font-bold text-xl">{dict.login.header}</h1>
					<p className="text-bas text-muted-foreground">
						{dict.login.description}
					</p>
				</div>
				<SignInButton btnText={dict.login.loginBtn} />
			</div>
		</div>
	);
}
