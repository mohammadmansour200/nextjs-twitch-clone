import { getDictionary } from "@/app/dictionaries";
import { auth } from "@/lib/auth";
import { getStreamByUserId } from "@/services/stream-service";
import { getLang } from "@/utils/getLang";
import { cookies } from "next/headers";
import ConnectModal from "./_components/ConnectModal";
import KeyCard from "./_components/KeyCard";
import UrlCard from "./_components/UrlCard";

async function KeysPage() {
	const lang = getLang(cookies());
	const dict = await getDictionary(lang);

	const self = await auth();
	const stream = await getStreamByUserId(self?.user?.userId);

	if (!stream) throw new Error("Stream not found");

	return (
		<div className="p-6">
			<div className="flex items-center justify-between mb-4">
				<h1 className="text-2xl font-bold">{dict.dashboard.keys.title}</h1>
				<ConnectModal generateModalText={dict.dashboard.keys} />
			</div>
			<div className="space-y-4">
				<UrlCard value={stream.serverUrl} />
				<KeyCard
					showText={dict.dashboard.keys.showKey}
					hideText={dict.dashboard.keys.hideKey}
					value={stream.streamKey}
				/>
			</div>
		</div>
	);
}

export default KeysPage;
