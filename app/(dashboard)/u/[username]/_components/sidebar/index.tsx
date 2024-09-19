import { getDictionary } from "@/app/dictionaries";
import { auth } from "@/lib/auth";
import { dir } from "@/utils/getDir";
import { getLang } from "@/utils/getLang";
import { cookies } from "next/headers";
import Navigation from "./Navigation";
import Toggle from "./Toggle";
import Wrapper from "./Wrapper";

async function Sidebar() {
	const session = await auth();

	const lang = getLang(cookies());
	const dict = await getDictionary(lang);

	const hintDir = dir(lang) === "rtl" ? "left" : "right";

	return (
		<Wrapper>
			<Toggle hintDir={hintDir} toggleText={dict.sidebar} />
			<Navigation
				/* biome-ignore lint/style/noNonNullAssertion: I've already checked wether the user is undefined or not */
				user={session?.user!}
				dashboardSidebarText={dict.dashboard.sidebar}
			/>
		</Wrapper>
	);
}

export default Sidebar;
