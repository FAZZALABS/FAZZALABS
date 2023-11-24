import { useState } from "react";

//src\features\ui\MintStart\utils\copyObjectX.ts
import { copyObjectX } from "../MintStart/utils";

import { useAccount } from "wagmi";

import { useRecoilValue } from "recoil";

import { toast } from "react-toastify";

import { NFTMap } from "./components/NftOutcom";

import { Preload } from "shared/UI";
import { ISELNFT, NFT } from "shared/types/types";
import { themeState } from "shared/libs/recoil";
import { getNormalizedImageUrl } from "shared/utils";
import { useCheckOwner } from "shared/libs/query";
import { QrCode } from "shared/UI/Icons";
import { RedirectIcon } from "shared/UI/Icons/RedirectIcon";

import { TypeNetworks } from "./types";

import cn from "classnames";
import { useMediaQuery } from "shared/hooks/useMediaQuery";

interface IProps {
	className?: string;
	NFTs: NFT[];
	selectedNft: ISELNFT | null;
	setSelectedNft: (el: ISELNFT | null) => void;
	setMintStart: any;
	fakeMint: boolean;
}
export function NftSelect({
	NFTs,
	selectedNft,
	setSelectedNft,
	setMintStart,
	fakeMint,
}: IProps) {
	const isMobile = useMediaQuery("(max-width: 1280px)");

	const [filter, setFilter] = useState<TypeNetworks>("All");
	const [collName, setCollName] = useState("");

	const theme = useRecoilValue(themeState);
	const { address } = useAccount();

	const { checkOwner, error: checkErr } = useCheckOwner();

	const startNFTMint = async (nft: ISELNFT) => {
		console.log("check owner: ", nft);

		var localObjectCopy = copyObjectX(nft);
		console.log(JSON.stringify(nft));

		console.log(localObjectCopy);

		console.log(JSON.stringify(localObjectCopy));

		const resp = await checkOwner(nft, address!);
		checkErr && toast("Error");

		
		if (resp) {
			console.log("check owner: ", resp);
			toast("Let's start!");
			setTimeout(() => setMintStart(resp), 100);
		} else {
			toast("You don't have this nft!");
		}
	};

	const image = selectedNft?.external_data?.image;
	const isVideo = selectedNft?.external_data?.asset_file_extension === "mp4";

	return (
		<>
			<span
				className={cn(
					"block sm:hidden absolute h-full w-[1px] top-0 left-0",
					theme === "blue"
						? "bg-primary boxShadow"
						: "bg-primary-revert boxShadow-revert"
				)}
			></span>
			<div
				className={cn(
					" pl-4 lg:pl-8 3xl:pl-12 pt-5 3xl:pt-12 pr-5 3xl:pr-8",
					"test-base lg:text-xl 3xl:text-[24px] relative",
					theme === "blue" ? "text-primary" : "text-primary-revert"
				)}
			>
				<span
					className={cn(
						"hidden sm:block absolute h-full w-[1px] top-0 left-0",
						theme === "blue"
							? "bg-primary boxShadow"
							: "bg-primary-revert boxShadow-revert"
					)}
				></span>
				<span
					className={cn(
						"hidden sm:block absolute h-full w-[1px] top-0 right-0",
						theme === "blue"
							? "bg-primary boxShadow"
							: "bg-primary-revert boxShadow-revert"
					)}
				></span>
				<span className="leading-[100%]">Graduate your NFT-friend</span>
				<span className="leading-[100%]">_______________________________</span>
				{selectedNft !== null ? (
					<div className="flex-col h-full pt-2 3xl:pt-[19px] pb-3 3xl:pb-4">
						{selectedNft!.contract_address ===
						"0x" ? (
							// selectedNft.token_id === "0x00000000000003db" && fakeMint ? (
							<QrCode
								className={cn(
									"w-[280px] h-[280px] lg:h-[230px] lg:w-[230px]  m-auto"
								)}
							/>
						) : isVideo ? (
							<video
								className={cn(
									"relative w-full h-full max-h-[500px] lg:max-h-[250px]",
									"z-[1] group-hover:scale-[1.05] duration-500",
									isMobile && "min-h-[255px]"
								)}
								controls
							>
								<source src={image} type="video/mp4" />
							</video>
						) : (
							<img
								className={cn(
									"flex-[1_1_auto] m-auto",
									"lg:h-[50px] lg:max-h-[500px] max-w-[280px] lg:max-w-full",
									isMobile && "min-h-[255px]"
								)}
								src={getNormalizedImageUrl(image)}
								alt=""
							/>
						)}

						{selectedNft!.contract_address ===
						"0x" ? (
							// selectedNft.token_id === "0x" && fakeMint ? (
							<div
								className={cn(
									"grid grid-cols-2 sm:grid-cols-3 grid-rows-3 sm:grid-rows-2",
									"w-full justify-between gap-2  text-white sm:px-5 lg:px-0"
								)}
							>
								<button
									onClick={() =>
										// window.open("http://localhost:3001/", "_blank")
										window.open("http://brainprint.app/chat/", "_blank")
									}
									className={cn(
										"px-2 py-1 text-[12px] rounded-md font-bold",
										"bg-[#F9861C] flex items-center justify-between"
									)}
								>
									<RedirectIcon className="w-5 h-5" /> BP Chat
								</button>
								<button
									className={cn(
										"px-2 py-1 text-base rounded-md font-bold",
										"bg-[#4C86C2] flex items-center justify-between"
									)}
								>
									<RedirectIcon className="w-5 h-5" />{" "}
									<img
										src="data:image/png;base64,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"
										alt=""
									/>
								</button>
								<button
									className={cn(
										"px-2 py-1 text-base rounded-md font-bold",
										"bg-[#7c0818] flex items-center justify-between"
									)}
								>
									<RedirectIcon className="w-5 h-5" /> Chirper
								</button>
								<button
									className={cn(
										"px-2 py-1 text-base rounded-md font-bold",
										"bg-[#2F6101] flex items-center justify-between"
									)}
								>
									<RedirectIcon className="w-5 h-5" /> Tavern
								</button>
								<button
									className={cn(
										"px-2 py-1 text-[12px] rounded-md font-bold",
										"bg-[#2db795] flex items-center justify-between"
									)}
								>
									<RedirectIcon className="w-5 h-5" /> Bored A Bar
								</button>
								<button
									className={cn(
										"px-2 py-1 text-base rounded-md font-bold",
										"bg-[#723498] flex items-center justify-between"
									)}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										viewBox="1 1 18 18"
									>
										<title>download</title>
										<path
											fill="#FFFFFF"
											d="M17 12v5H3v-5H1v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5z"
										/>
										<path fill="#FFFFFF" d="M10 15l5-6h-4V1H9v8H5l5 6z" />
									</svg>{" "}
									Json
								</button>
							</div>
						) : (
							<button
								onClick={() => {
									startNFTMint(selectedNft);
								}}
								className={cn(
									"hover:bg-[#DDF3FF] text-[24px] leading-[100%] duration-500",
									"py-4 px-6 mt-4 mx-auto lg:mx-0 max-w-[290px] lg:max-w-full w-[280px] lg:w-auto",
									theme === "blue"
										? "bg-[#A6DFFF] shadow-[0px_0px_4px_0px_#8BD5FF,0px_0px_16px_0px_#0047FF] text-secondary"
										: "bg-[#36A834] shadow-[0px_0px_4px_0px_#36A834,0px_0px_16px_0px_#5BCF24] text-secondary-revert"
								)}
							>
								USE THIS NFT
							</button>
						)}
					</div>
				) : (
					<Preload
						className="mt-3"
						title="Choose your NFT, with a thirst for knowledge and respect"
					/>
				)}
			</div>
			<div className="sm:w-auto">
				<div className="grid sm:grid-cols-[max-content_auto] mt-3 3xl:mt-9 items-center w-full gap-3">
					<div className="2xl:flex-row w-auto gap-3">
						<span
							className={cn(
								"hidden sm:block text-[20px]",
								theme === "blue"
									? "text-primary textShadow"
									: "text-primary-revert textShadow-revert"
							)}
						>
							SEARCH YOUR NFT FRIEND
						</span>
						<input
							value={collName}
							onChange={(el) => setCollName(el.target.value)}
							className={cn(
								"mx-auto sm:mx-0 w-[260px] 2xl:w-[200px] px-4 h-fit",
								"bg-transparent border-b-2 sm:border-2 border-t-transparent border-primary text-white text-xl"
							)}
							type="text"
						/>
					</div>
					<div className="w-[80vw] sm:w-fit flex-row flex-wrap gap-4 mx-auto sm:mx-0">
						{TypeNetworks.map((el: TypeNetworks, i) => (
							<button
								key={i}
								className={cn(
									"py-1 px-3 text-[12px] sm:text-sm",
									theme === "blue"
										? "bg-[#A6DFFF] shadow-[0px_0px_4px_0px_#8BD5FF,0px_0px_16px_0px_#0047FF]"
										: "bg-[#36A834] shadow-[0px_0px_4px_0px_#36A834,0px_0px_16px_0px_#5BCF24]",
									el === filter && "bg-white"
								)}
								onClick={() => setFilter(el)}
							>
								{el}
							</button>
						))}
					</div>
				</div>
				<NFTMap
					filter={filter}
					selectedNft={selectedNft}
					setSelectedNft={setSelectedNft}
					NFTs={NFTs}
					collName={collName}
					fakeMint={fakeMint}
				/>
			</div>
		</>
	);
}
