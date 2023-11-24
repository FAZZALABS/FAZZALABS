import { useState } from "react";

import { useRecoilValue } from "recoil";

import { ISELNFT } from "shared/types/types";
import { getNormalizedImageUrl } from "shared/utils";
import { themeState } from "shared/libs/recoil";
import { QrCode } from "shared/UI/Icons";

import cn from "classnames";

import { setSelected } from "./setSelected";

export function NFTCard({
	selectedNft,
	setSelectedNft,
	NFT,
}: {
	address: string;
	selectedNft: ISELNFT | null;
	setSelectedNft: (el: ISELNFT | null) => void;
	NFT: ISELNFT;
	fakeMint: boolean;
}) {
	const [fake, setFake] = useState(false);

	if (NFT.contract_address === "0x")
		console.log(NFT.defaultTokenId, "--");

	const theme = useRecoilValue(themeState);
	const startMint = (NFT: ISELNFT) => {
		setSelectedNft(NFT);
	};
	const image =
		NFT?.external_data?.image ||
		NFT?.external_data?.image_256 ||
		NFT?.external_data?.image_512 ||
		NFT?.external_data?.image_1024;
	const isVideo = NFT?.external_data?.asset_file_extension == "mp4";

	if (NFT.contract_address === "0x02e591665b785cda7404e005c323c262667d6f54")
		// if (NFT.token_id === "0x00000000000003db" && fakeMint)
		return (
			<QrCode
				onClick={() => {
					setSelected(NFT, startMint);
					setFake(true);
				}}
				className={cn(
					"w-[86px] lg:w-[120px] 2xl:w-[150px] h-[86px] lg:h-[120px] 2xl:h-[150px]",
					fake &&
						"border-2 shadow-[0px_0px_10px_0px_#8BD5FF,0px_0px_16px_0px_#0047FF] border-primary"
				)}
			/>
		);

	if (!image) return;
	return (
		<div
			onClick={() => setSelected(NFT, startMint)}
			className={cn(
				"relative min-w-[96px] w-[96px] lg:w-[120px] 2xl:w-[155px]",
				"h-[96px] lg:h-[120px] 2xl:h-[155px] 3xl:w-[192px] 3xl:h-[192px]",
				"mx-auto p-1 border group overflow-hidden",
				theme === "blue" ? "border-primary" : "border-primary-revert"
			)}
		>
			{!isVideo ? (
				<img
					className="relative w-full h-full z-[1] group-hover:scale-[1.05] duration-500"
					key={NFT?.token_id}
					src={getNormalizedImageUrl(image)}
					alt=""
				/>
			) : (
				<video
					className="relative w-full h-full z-[1] group-hover:scale-[1.05] duration-500"
					controls
				>
					<source src={image} type="video/mp4" />
				</video>
			)}
			{selectedNft?.external_data?.image ||
				selectedNft?.external_data?.image_256 ||
				selectedNft?.external_data?.image_512 ||
				(selectedNft?.external_data?.image_1024 !== image && (
					<div
						className={cn(
							"absolute w-[calc(100%-8px)] h-[calc(100%-8px)]",
							"top-1 left-1 nftBg opacity-[0.5] z-[2]",
							"hover:opacity-0 duration-500 cursor-pointer"
						)}
					></div>
				))}
		</div>
	);
}
