/* eslint-disable no-mixed-spaces-and-tabs */
import { useState } from "react";

import { useRecoilValue } from "recoil";

import { MintStart, NftSelect } from "features/ui";

import { ISELNFT, NFT } from "shared/types/types";
import { themeState } from "shared/libs/recoil";
import { useGetNFTS } from "shared/libs/query/useGetAllNfts";
import { Congratulations } from "shared/UI/Congratulations";

import cn from "classnames";

export function User() {
	const theme = useRecoilValue(themeState);
	const [selectedNft, setSelectedNft] = useState<ISELNFT | null>(null);
	const [mintStart, setMintStart] = useState<any>(null);

	const [allNfts, setAllNfts] = useState<NFT[]>([]);

	const [fakeMint, setFakeMint] = useState(false);

	useGetNFTS(setAllNfts);

	return (
		<article
			className={cn(
				"flex-1 grid grid-cols-1 xl:grid-cols-[min-content_auto]",
				"gap-6 3xl:gap-10 lg:pr-5 relative"
			)}
		>
			<Congratulations />
			<span
				className={cn(
					"absolute h-[100%] bottom-0 z-[200000]",
					"right-0 w-[1px]",
					theme === "blue"
						? "boxShadow bg-primary"
						: "boxShadow-revert bg-primary-revert"
				)}
			></span>
			{selectedNft && selectedNft?.external_data && mintStart ? (
				<MintStart
					setSelectedNft={setSelectedNft}
					selectedNft={selectedNft}
					mintStart={mintStart}
					setFakeMint={setFakeMint}
					setMintStart={setMintStart}
				/>
			) : (
				<NftSelect
					NFTs={allNfts}
					selectedNft={selectedNft}
					setMintStart={setMintStart}
					setSelectedNft={setSelectedNft}
					fakeMint={fakeMint}
				/>
			)}
		</article>
	);
}
