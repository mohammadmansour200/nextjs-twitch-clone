import { getDictionary } from "@/app/dictionaries";
import { StreamPlayerIntlProvider } from "@/components/StreamPlayerIntlProvider";
import StreamPlayer from "@/components/stream-player";
import { auth } from "@/lib/auth";
import { isBlockedByUser } from "@/services/block-service";
import { isFollowingUser } from "@/services/follow-service";
import { getUserByUsername } from "@/services/user-service";
import { getLang } from "@/utils/getLang";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

interface UserPageProps {
	params: { username: string };
}

export const metadata: Metadata = {
	title: "",
	description: "",
	twitter: {
		images: "",
	},
	openGraph: {
		images: "",
	},
};

async function UserPage({ params }: UserPageProps) {
	const user = await getUserByUsername(params.username);
	if (!user || !user.stream) notFound();

	metadata.title = `Twitch clone | ${user.username}`;
	metadata.description = user.bio;

	// biome-ignore lint/style/noNonNullAssertion: Shoudn't be null
	metadata.twitter!.images = user.stream.thumbnailUrl || user.imageUrl;

	// biome-ignore lint/style/noNonNullAssertion: Shoudn't be null
	metadata.openGraph!.images = user.stream.thumbnailUrl || user.imageUrl;

	const isBlockedByThisUser = await isBlockedByUser(user.id);
	if (isBlockedByThisUser) notFound();

	const lang = getLang(cookies());
	const dict = await getDictionary(lang);

	const isFollowing = await isFollowingUser(user.id);

	const session = await auth();

	return (
		<StreamPlayerIntlProvider translations={dict.streamPlayer} lang={lang}>
			<StreamPlayer
				session={session}
				user={user}
				stream={user.stream}
				isFollowing={isFollowing}
			/>
		</StreamPlayerIntlProvider>
	);
}

export default UserPage;
