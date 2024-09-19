import type { Locale } from "@/i18n-config";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export const getLang = (cookies: ReadonlyRequestCookies) =>
	(cookies.get("lang")?.value as Locale) ?? "ar";
