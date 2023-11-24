import { useState } from "react";

export function useRequest() {
	const [mint, setMint] = useState("");
	const setCurrentMint = (el: string) => {
		setMint(el);
	};
	return {
		mint,
		setCurrentMint,
	};
}
