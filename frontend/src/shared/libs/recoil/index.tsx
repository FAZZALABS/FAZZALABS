import { atom } from "recoil";

export const walletState = atom({
	key: "walletState", // unique ID (with respect to other atoms/selectors)
	default: false, // default value (aka initial value)
});
export const chainState = atom<number | null>({
	key: "chainState", // unique ID (with respect to other atoms/selectors)
	default: null, // default value (aka initial value)
});

export const minState = atom<string>({
	key: "minState", // unique ID (with respect to other atoms/selectors)
	default: "", // default value (aka initial value)
});

export const LOCALE_STORAGE_THEME_KEY = "theme";

type ThemeType = "blue" | "green";

export const themeState = atom<ThemeType>({
	key: "themeState", // unique ID (with respect to other atoms/selectors)
	default:
		(localStorage.getItem(LOCALE_STORAGE_THEME_KEY) as ThemeType) || "blue",
});
export const showState = atom({
	key: "showState", // unique ID (with respect to other atoms/selectors)
	default: false,
});
