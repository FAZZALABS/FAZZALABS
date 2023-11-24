import { toast } from "react-toastify";
import { ISELNFT } from "shared/types/types";

export function setSelected(nft: ISELNFT, startMint: (NFT: ISELNFT) => void) {
	if (nft.contract_address === "0x02e591665b785cda7404e005c323c262667d6f54") {
		startMint(nft);
		return;
	}
	if (!nft.external_data.attributes) {
		toast(
			"Seems this 1 aint wanna talk 2 you, pls select your real nft friend"
		);
		return;
	} else {
		startMint(nft);
	}
}
