import { getDictionary } from "@/app/dictionaries";
import { auth } from "@/lib/auth";
import { getStreamByUserId } from "@/services/stream-service";
import { getLang } from "@/utils/getLang";
import { cookies } from "next/headers";
import ToggleCard from "./_components/ToggleCard";

async function ChatPage() {
	const self = await auth();
	const stream = await getStreamByUserId(self?.user?.userId);

	const lang = getLang(cookies());
	const dict = await getDictionary(lang);

	if (!stream) throw new Error("Stream not found");

	return (
		<div className="p-3">
			<div className="mb-4">
				<h1 className="text-2xl font-bold">{dict.dashboard.chat.title}</h1>
			</div>
			<div className="space-y-4">
				<ToggleCard
					updateText={{
						settingsUpdateError: dict.dashboard.settingsUpdateError,
						settingsUpdateSuccess: dict.dashboard.settingsUpdateSuccess,
					}}
					field="isChatEnabled"
					label={dict.dashboard.chat.enableChat}
					value={stream.isChatEnabled}
				/>
				<ToggleCard
					updateText={{
						settingsUpdateError: dict.dashboard.settingsUpdateError,
						settingsUpdateSuccess: dict.dashboard.settingsUpdateSuccess,
					}}
					field="isChatDelayed"
					label={dict.dashboard.chat.delayChat}
					value={stream.isChatDelayed}
				/>
				<ToggleCard
					updateText={{
						settingsUpdateError: dict.dashboard.settingsUpdateError,
						settingsUpdateSuccess: dict.dashboard.settingsUpdateSuccess,
					}}
					field="isChatFollowersOnly"
					label={dict.dashboard.chat.followersOnlyChat}
					value={stream.isChatFollowersOnly}
				/>
			</div>
		</div>
	);
}

export default ChatPage;
