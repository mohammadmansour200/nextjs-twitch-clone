"use client";
import { useTheme } from "next-themes";
import { Toaster } from "sonner";

interface ThemedToasterProps {
	dir: "rtl" | "ltr";
}

function ThemedToaster({ dir }: ThemedToasterProps) {
	const { theme, systemTheme: systemThemePreference } = useTheme();
	const systemTheme = systemThemePreference === "dark" ? "light" : "dark";

	const toasterTheme =
		theme === "dark" ? "light" : theme === "system" ? systemTheme : "dark";

	return <Toaster theme={toasterTheme} dir={dir} position="bottom-center" />;
}

export default ThemedToaster;
