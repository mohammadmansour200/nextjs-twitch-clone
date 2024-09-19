"use client";

import type { Locale } from "@/i18n-config";
import { dir } from "@/utils/getDir";
import { createContext, useContext } from "react";

type Translation = {
	chatCollapseBtnHint: string;
	chatExpandBtnHint: string;
	offlineVideoLabel: string;
	unmute: string;
	mute: string;
	fullscreen: string;
	exitFullscreen: string;
	userOffline: string;
	editStream: string;
	editBtn: string;
	infoName: string;
	infoThumbnail: string;
	editStreamSuccess: string;
	editStreamError: string;
	editSave: string;
	editCancel: string;
	aboutCardLabel: string;
	aboutCardFollowers: string;
	aboutCardNoBio: string;
	followBtn: string;
	unfollowBtn: string;
	followSuccess: string;
	unfollowSuccess: string;
	followError: string;
	chatHeaderLabel: string;
	variationChatHint: string;
	hiddenChat: string;
	welcomeChat: string;
	onlyFollowersChatHint: string;
	onlyFollowersChatLabel: string;
	delayedChatHint: string;
	delayedChatLabel: string;
	onlyFollowersAndIsDelayedChatHint: string;
	onlyFollowersAndIsDelayedChatLabel: string;
	chatInputPlaceholder: string;
	chatInputSend: string;
	variationCommunityHint: string;
	hiddenCommunity: string;
	searchCommunityInputPlaceholder: string;
	searchCommunityNoResults: string;
	blockBtn: string;
	unblockBtn: string;
	blockSuccess: string;
	unblockSuccess: string;
	blockError: string;
};

interface StreamPlayerIntlType {
	direction: "rtl" | "ltr";
	translations: Translation;
	lang: Locale;
}

const StreamPlayerIntlContext = createContext<StreamPlayerIntlType>({
	direction: "rtl",
	lang: "ar",
	translations: {
		chatCollapseBtnHint: "",
		chatExpandBtnHint: "",
		offlineVideoLabel: "",
		unmute: "",
		mute: "",
		fullscreen: "",
		exitFullscreen: "",
		userOffline: "",
		editStream: "",
		editBtn: "",
		infoName: "",
		infoThumbnail: "",
		editStreamSuccess: "",
		editStreamError: "",
		editSave: "",
		editCancel: "",
		aboutCardLabel: "",
		aboutCardFollowers: "",
		aboutCardNoBio: "",
		followBtn: "",
		unfollowBtn: "",
		followSuccess: "",
		unfollowSuccess: "",
		followError: "",
		chatHeaderLabel: "",
		variationChatHint: "",
		hiddenChat: "",
		welcomeChat: "",
		onlyFollowersChatHint: "",
		onlyFollowersChatLabel: "",
		delayedChatHint: "",
		delayedChatLabel: "",
		onlyFollowersAndIsDelayedChatHint: "",
		onlyFollowersAndIsDelayedChatLabel: "",
		chatInputPlaceholder: "",
		chatInputSend: "",
		variationCommunityHint: "",
		hiddenCommunity: "",
		searchCommunityInputPlaceholder: "",
		searchCommunityNoResults: "",
		blockBtn: "",
		unblockBtn: "",
		blockSuccess: "",
		unblockSuccess: "",
		blockError: "",
	},
});

interface StreamPlayerIntlProviderProps {
	children: React.ReactNode;
	translations: Translation;
	lang: Locale;
}

function StreamPlayerIntlProvider({
	children,
	lang,
	translations,
}: StreamPlayerIntlProviderProps) {
	const direction = dir(lang);
	return (
		<StreamPlayerIntlContext.Provider value={{ direction, lang, translations }}>
			{children}
		</StreamPlayerIntlContext.Provider>
	);
}

function useStreamPlayerIntl() {
	const context = useContext(StreamPlayerIntlContext);
	if (context === undefined)
		throw new Error(
			"StreamPlayerIntlContext was used outside of StreamPlayerIntlProvider",
		);
	return context;
}

export { StreamPlayerIntlProvider, useStreamPlayerIntl };
