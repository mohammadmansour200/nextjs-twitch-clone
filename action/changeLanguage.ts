"use server";

import { cookies } from "next/headers";

export async function changeLanguage(lang: string) {
	const year = 24 * 60 * 60 * 1000 * 30 * 12;
	cookies().set({
		name: "lang",
		value: lang,
		maxAge: year,
	});
}
