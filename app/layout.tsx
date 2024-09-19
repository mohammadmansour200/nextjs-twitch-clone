import "./globals.css";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemedToaster from "@/components/ThemedToaster";
import { dir } from "@/utils/getDir";
import { getLang } from "@/utils/getLang";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { cookies } from "next/headers";
import { extractRouterConfig } from "uploadthing/server";

export const metadata = {
	title: "Next.js Twitch clone",
	description:
		"A Twitch clone using Prisma (MySQL), Next.js, NextAuth and Tailwind CSS",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const lang = getLang(cookies());
	return (
		<html lang={lang}>
			<body dir={dir(lang)} className="bg-background text-foreground">
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<ThemedToaster dir={dir(lang)} />
					<NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
