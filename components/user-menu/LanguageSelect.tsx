"use client";
import { changeLanguage } from "@/action/changeLanguage";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { Locale } from "@/i18n-config";
import { Languages } from "lucide-react";

interface LanguageSelectProps {
	lang: Locale;
}

function LanguageSelect({ lang }: LanguageSelectProps) {
	return (
		<div className="flex items-center gap-2 rtl:flex-row-reverse">
			<Languages />
			<Select
				onValueChange={async (lang) => await changeLanguage(lang)}
				defaultValue={lang || "ar"}
			>
				<SelectTrigger>
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="ar">العربية</SelectItem>
					<SelectItem value="en">English</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
}

export default LanguageSelect;
