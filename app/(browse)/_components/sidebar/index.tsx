import { getDictionary } from "@/app/dictionaries";
import { getFollowedUsers } from "@/services/follow-service";
import { getRecommended } from "@/services/recommended-service";
import { dir } from "@/utils/getDir";
import { getLang } from "@/utils/getLang";
import { cookies } from "next/headers";
import Following, { FollowingSkeleton } from "./Following";
import Recommended, { RecommendedSkeleton } from "./Recommended";
import Toggle, { ToggleSkeleton } from "./Toggle";
import Wrapper from "./Wrapper";

async function Sidebar() {
	const recommended = await getRecommended();
	const followed = await getFollowedUsers();
	const lang = getLang(cookies());
	const dict = await getDictionary(lang);

	const hintDir = dir(lang) === "rtl" ? "left" : "right";

	return (
		<Wrapper>
			<Toggle hintDir={hintDir} toggleHint={dict.sidebar} />
			<div className="space-y-4 pt-4 lg:pt-0">
				<Following label={dict.sidebar.following} data={followed} />
				<Recommended label={dict.sidebar.recommended} data={recommended} />
			</div>
		</Wrapper>
	);
}

export default Sidebar;

export function SidebarSkeleton() {
	return (
		<aside className="fixed ltr:left-0 rtl:right-0 flex flex-col w-[70px] lg:w-60 h-full bg-background ltr:border-r rtl:border-l border-[#2D2E35] z-50">
			<ToggleSkeleton />
			<FollowingSkeleton />
			<RecommendedSkeleton />
		</aside>
	);
}
