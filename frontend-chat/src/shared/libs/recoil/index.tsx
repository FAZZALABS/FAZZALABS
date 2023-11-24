import { atom } from "recoil";
import { ISELNFT } from "shared/types";

export const walletState = atom({
	key: "walletState", // unique ID (with respect to other atoms/selectors)
	default: false, // default value (aka initial value)
});
export const chainState = atom<number | null>({
	key: "chainState", // unique ID (with respect to other atoms/selectors)
	default: null, // default value (aka initial value)
});

export const LOCALE_STORAGE_THEME_KEY = "theme";

type ThemeType = "blue" | "green";

export const themeState = atom<ThemeType>({
	key: "themeState", // unique ID (with respect to other atoms/selectors)
	default:
		(localStorage.getItem(LOCALE_STORAGE_THEME_KEY) as ThemeType) || "blue",
});
export const windowaiState = atom({
	key: "windowaiState", // unique ID (with respect to other atoms/selectors)
	default: "dd", // default value (aka initial value)
});
export const AIModalState = atom({
	key: "AIModalState", // unique ID (with respect to other atoms/selectors)
	default: "openai/gpt-3.5-turbo", // default value (aka initial value)
});

export const nftState = atom<ISELNFT | null>({
	key: "nftState", // unique ID (with respect to other atoms/selectors)
	default: null, // default value (aka initial value)
});

export const nameState = atom({
	key: "nameState", // unique ID (with respect to other atoms/selectors)
	default: "", // default value (aka initial value)
});
