import { getDictionary } from "@/app/dictionaries";
import { getBlockedUsers } from "@/services/block-service";
import { getLang } from "@/utils/getLang";
import { format } from "date-fns";
import { cookies } from "next/headers";
import { DataTable } from "./_components/DataTable";

async function CommunityPage() {
	const lang = getLang(cookies());
	const dict = await getDictionary(lang);

	const blockedUsers = await getBlockedUsers();

	const formattedData = blockedUsers.map((block) => ({
		...block,
		userId: block.blocked.id,
		imageUrl: block.blocked.imageUrl,
		username: block.blocked.username,
		createdAt: format(new Date(block.blocked.createdAt), "dd/MM/yyyy"),
	}));

	return (
		<div className="p-6">
			<div className="mb-4">
				<h1 className="text-2xl font-bold">{dict.dashboard.community.title}</h1>
			</div>
			<DataTable
				dataTableText={dict.dashboard.community}
				data={formattedData}
			/>
		</div>
	);
}

export default CommunityPage;
