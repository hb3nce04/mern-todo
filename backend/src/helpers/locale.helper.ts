import enLocale from "../locales/en.locale.json";
import huLocale from "../locales/hu.locale.json";
import { Request } from "express";
import { DEFAULT_LOCALE } from "../configs/constants";

export const getLocalizedText = (
	req: Request,
	category: string,
	key: string
): string => {
	const acceptedLanguage = req.acceptsLanguages("en", "hu") || DEFAULT_LOCALE;
	const doc: any = acceptedLanguage === "hu" ? huLocale : enLocale;
	return doc[category][key] || key;
};
