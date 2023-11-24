import { useRecoilValue } from "recoil";

import { CONTRACT_ADDRESS } from "../../../../../app/config/variables";

import { NFTCard } from "entites/ui";

import { ISELNFT, NFT } from "shared/types/types";
import { images } from "shared/assets";
import { useMediaQuery } from "shared/hooks/useMediaQuery";
import { themeState } from "shared/libs/recoil";

import cn from "classnames";
import { TypeNetworks } from "../../types";

interface IProps {
	NFTs: NFT[];
	selectedNft: ISELNFT | null;
	collName: string;
	filter: TypeNetworks;
	setSelectedNft: (el: ISELNFT | null) => void;
	fakeMint: boolean;
}

export function NFTMap({
	NFTs,
	selectedNft,
	collName,
	setSelectedNft,
	filter,
	fakeMint,
}: IProps) {
	const isMobile = useMediaQuery("(max-width: 600px)");
	const theme = useRecoilValue(themeState);

	if (NFTs.length <= 0)
		return (
			<div className="gap-4 m-auto flex-1 justify-center">
				<span
					className={cn(
						"text-center text-sm sm:text-lg 2xl:text-[22px] text-primary uppercase",
						"mx-5 xl:mx-10 2xl:mx-20 mt-4 lg:mt-0 "
					)}
				>
					wait a beat, we're catching all your nft friends on different
					blockchains and lining them up.
				</span>
				<img
					className="mx-auto w-full h-10 sm:h-[220px]"
					src={images.gif}
					alt=""
				/>
			</div>
		);
	const middleIndex = Math.ceil(NFTs.length / 2);

	return (
		<>
			{isMobile ? (
				<div className="pl-[19px] my-5 gap-[10px]">
					<div
						className={cn(
							"flex flex-row overflow-x-scroll justify-between gap-[10px]",
							"max-h-[108px]"
						)}
					>
						{NFTs.splice(middleIndex)
							.filter((el) =>
								el.nft_data[0]?.external_data?.name?.includes(collName)
							)
							.filter((el) => {
								if (filter === "All") return el;
								if (filter === "Arbitrum Nova")
									return el.network === "arbitrum-nova-mainnet";
								if (filter === "BSC") return el.network === "bsc-testnet";
								if (filter === "Ethereum") return el.network === "eth-mainnet";
								if (filter === "Optimism")
									return el.network === "optimism-mainnet";
								if (filter === "Polygon zkEVM")
									return el.network === "polygon-zkevm-mainnet";
								if (filter === "Polygon mumbai")
									return el.network === "matic-mumbai";
								if (filter === "Brainprint")
									return (
										el.contract_address ===
										CONTRACT_ADDRESS
									);
							})
							.map((it) =>
								it.nft_data.map((NFT, i) => {
									return (
										<NFTCard
											NFT={NFT}
											selectedNft={selectedNft}
											setSelectedNft={setSelectedNft}
											key={i}
											address={it.contract_address}
											fakeMint={fakeMint}
										/>
									);
								})
							)}
					</div>
					<div
						className={cn(
							"flex flex-row overflow-x-scroll justify-between gap-[10px]",
							"max-h-[108px]"
						)}
					>
						{NFTs.splice(0, middleIndex)
							.filter((el) =>
								el.nft_data[0]?.external_data?.name?.includes(collName)
							)
							.filter((el) => {
								if (filter === "All") return el;
								if (filter === "Arbitrum Nova")
									return el.network === "arbitrum-nova-mainnet";
								if (filter === "BSC") return el.network === "bsc-testnet";
								if (filter === "Ethereum") return el.network === "eth-mainnet";
								if (filter === "Optimism")
									return el.network === "optimism-mainnet";
								if (filter === "Polygon zkEVM")
									return el.network === "polygon-zkevm-mainnet";
								if (filter === "Polygon mumbai")
									return el.network === "matic-mumbai";
								if (filter === "Brainprint")
									return (
										el.contract_address ===
										CONTRACT_ADDRESS
									);
							})
							.map((it) =>
								it.nft_data.map((NFT, i) => {
									return (
										<NFTCard
											NFT={NFT}
											selectedNft={selectedNft}
											setSelectedNft={setSelectedNft}
											key={i}
											address={it.contract_address}
											fakeMint={fakeMint}
										/>
									);
								})
							)}
					</div>
				</div>
			) : (
				<div
					className={cn(
						"grid grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6",
						"overflow-y-scroll justify-between gap-4 3xl:gap-6 mt-[20px]",
						"max-h-[216px] lg:max-h-[calc(100vh-400px)] lg: lg:pr-[52px]",
						"lg:scrollbar scrollbar-track-[#242D51] scrollbar_custom",
						theme === "blue"
							? "scrollbar-thumb-primary"
							: "scrollbar-thumb-primary-revert"
					)}
				>
					{NFTs.filter((el) => {
						if (el?.nft_data[0]?.external_data?.name) {
							return el?.nft_data[0]?.external_data?.name?.includes(collName);
						} else {
							return el;
						}
					})
						.filter((el) => {
							if (filter === "All") return el;
							if (filter === "Arbitrum Nova")
								return el.network === "arbitrum-nova-mainnet";
							if (filter === "BSC") return el.network === "bsc-testnet";
							if (filter === "Ethereum") return el.network === "eth-mainnet";
							if (filter === "Optimism")
								return el.network === "optimism-mainnet";
							if (filter === "Polygon zkEVM")
								return el.network === "polygon-zkevm-mainnet";
							if (filter === "Polygon mumbai")
								return el.network === "matic-mumbai";
							if (filter === "Brainprint")
								return (
									el.contract_address ===
									CONTRACT_ADDRESS
								);
						})
						.map((it) =>
							it.nft_data.map((NFT, i) => {
								return (
									<NFTCard
										fakeMint={fakeMint}
										NFT={NFT}
										selectedNft={selectedNft}
										setSelectedNft={setSelectedNft}
										key={i}
										address={it.contract_address}
									/>
								);
							})
						)}
				</div>
			)}
		</>
	);
}
