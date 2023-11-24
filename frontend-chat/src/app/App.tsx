import { useAccount } from "wagmi";

import { ChatPage, MainPage, UnSignedPage } from "pages";
import { useRecoilValue } from "recoil";
import { nameState, nftState, windowaiState } from "shared/libs/recoil";

export function App() {
	const { address } = useAccount();
	const name = useRecoilValue(nameState);
	const windowAIState = useRecoilValue(windowaiState);
	const getNftState = useRecoilValue(nftState);

	const queryParameters = new URLSearchParams(window.location.search);
	const img = queryParameters.get("img");
	if (address && name) {
		if (
			img ||
			(windowAIState && getNftState && getNftState?.external_data?.attributes)
		) {
			return <ChatPage />;
		} else {
			return <MainPage />;
		}
	} else {
		return <UnSignedPage />;
	}
}
