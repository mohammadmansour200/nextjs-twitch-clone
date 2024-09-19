import { getDictionary } from "@/app/dictionaries";
import { StreamPlayerIntlProvider } from "@/components/StreamPlayerIntlProvider";
import StreamPlayer from "@/components/stream-player";
import { auth } from "@/lib/auth";
import { getUserByUsername } from "@/services/user-service";
import { getLang } from "@/utils/getLang";
import { cookies } from "next/headers";

interface CreatorPageProps {
	params: {
		username: string;
	};
}

async function CreatorPage({ params }: CreatorPageProps) {
	const lang = getLang(cookies());
	const dict = await getDictionary(lang);

	const externalUser = await auth();
	const user = await getUserByUsername(params.username);

	if (!user || user.id !== externalUser?.user?.userId || !user.stream)
		throw new Error("Unauthorized");

	return (
		<div className="h-full">
			<StreamPlayerIntlProvider translations={dict.streamPlayer} lang={lang}>
				<StreamPlayer
					session={externalUser}
					user={user}
					stream={user.stream}
					isFollowing
				/>
			</StreamPlayerIntlProvider>
		</div>
	);
}

export default CreatorPage;
