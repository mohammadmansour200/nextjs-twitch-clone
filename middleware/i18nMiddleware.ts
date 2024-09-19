import { i18n } from "@/i18n-config";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { cookies } from "next/headers";
import {
	type NextFetchEvent,
	type NextRequest,
	NextResponse,
} from "next/server";
import type { CustomMiddleware } from "./chain";

export function getLocale(request: NextRequest) {
	if (cookies().get("lang")?.value) {
		return cookies().get("lang")?.value;
	}

	// Negotiator expects plain object so we need to transform headers
	const negotiatorHeaders: Record<string, string> = {};

	// biome-ignore lint/suspicious/noAssignInExpressions: This is how the guys at Next.js did it
	request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

	// @ts-ignore locales are readonly
	const locales: string[] = i18n.locales;

	// Use negotiator and intl-localematcher to get best locale
	const languages = new Negotiator({ headers: negotiatorHeaders }).languages(
		locales,
	);

	const locale = matchLocale(languages, locales, i18n.defaultLocale);

	return locale;
}

export function i18nMiddleware(middleware: CustomMiddleware) {
	return async (
		request: NextRequest,
		event: NextFetchEvent,
		response: NextResponse,
	) => {
		if (cookies().get("lang") === undefined) {
			const locale = getLocale(request);
			const pathname = request.nextUrl.pathname;
			const redirectURL = new URL(request.url);
			redirectURL.pathname = pathname;
			redirectURL.search = request.nextUrl.search;

			const year = 24 * 60 * 60 * 1000 * 30 * 12;

			const cookieHeader = `lang=${locale}; Max-Age=${year}`;
			return NextResponse.redirect(redirectURL.toString(), {
				headers: {
					"Set-Cookie": cookieHeader,
				},
			});
		}

		return middleware(request, event, response);
	};
}
