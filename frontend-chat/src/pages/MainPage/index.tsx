/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";

import { useAccount, useDisconnect } from "wagmi";

import { useRecoilState } from "recoil";

import { Tilt } from "react-tilt";

import { TextModelIDC } from "pages/model";

import { Button } from "shared/ui";
import { images } from "shared/assets";
import { getNormalizedImageUrl } from "shared/hooks";
import { nftState, windowaiState } from "shared/libs/recoil";

import cn from "classnames";
import { QrCode } from "shared/ui/Icons";
import { getAllNfts } from "shared/libs/query/useGetAllNfts";
import { BigNumber } from "ethers";
import { ISELNFT, NFT } from "shared/types";
import { toast } from "react-toastify";
import { CONTRACT_ADDRESS } from "../../app/config/variables"

const defaultOptions = {
	reverse: false, // reverse the tilt direction
	max: 5, // max tilt rotation (degrees)
	perspective: 100, // Transform perspective, the lower the more extreme the tilt gets.
	scale: 1, // 2 = 200%, 1.5 = 150%, etc..
	speed: 1000, // Speed of the enter/exit transition
	transition: true, // Set a transition on enter/exit.
	axis: null, // What axis should be disabled. Can be X or Y.
	reset: true, // If the tilt effect has to be reset on exit.
	easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
};
export function MainPage({ className }: { className?: string }) {
	const { address } = useAccount();
	function convertTo64BitString(value: string) {
		// Convert the decimal value to a BigNumber
		const decimalValue = BigNumber.from(value); // Use BigNumber.from to create a BigNumber instance

		// Convert the BigNumber to a 64-bit hexadecimal string
		const hexValue = decimalValue.toHexString().slice(2).padStart(16, "0");

		// Add the '0x' prefix
		return `0x${hexValue}`;
	}

	const brainPrintContract = CONTRACT_ADDRESS.toString().toLowerCase();

	const [allNfts, setAllNfts] = useState<NFT[]>([]);
	useEffect(() => {
		async function fetchData() {
			try {
				const responses = await getAllNfts(
					address!
					// "0xe5442aE87E0fEf3F7cc43E507adF786c311a0529"!
				);
				for (const chain in responses) {
					const response = responses[chain];
					if (response.status === 200) {

						const filteredData = new Array();

						for(var idx = 0; idx < response.data.data.items.length; idx++){
							const elem = response.data.data.items[idx];
							if(brainPrintContract.indexOf(elem.contract_address.toLowerCase()) > -1)
							{
								filteredData.push(elem);
							}
							else
							{
								console.log('filtered NFT: ' + JSON.stringify(elem));
							}
						}

						//const nftData = response.data.data;

						let network = "";
						if (chain === "eth-mainnet") {
							network = "eth-mainnet";
						} else if (chain === "polygon-zkevm-mainnet") {
							network = "polygon-zkevm-mainnet";
						} else if (chain === "arbitrum-nova-mainnet") {
							network = "arbitrum-nova-mainnet";
						} else if (chain === "optimism-mainnet") {
							network = "optimism-mainnet";
						} else if (chain === "bsc-testnet") {
							network = "bsc-testnet";
						} else if (chain === "base-mainnet") {
							network = "base-mainnet";
						}
						const nftsWithNetwork = filteredData.map((item: any) => ({
							...item,
							network,

							nft_data: item.nft_data.map((nftItem: ISELNFT) => ({
								...nftItem,
								token_id: convertTo64BitString(nftItem.token_id),
								contract_address: item.contract_address,
								defaultTokenId: nftItem.token_id,
								network,
								balance: item.balance,
								balance_24h: item.balance_24h,
							})),
						}));
						setAllNfts((prev) => [...prev, ...nftsWithNetwork]);
					} else {
						console.error(
							`Error fetching data for ${chain}: ${response.statusText}`
						);
					}
				}
			} catch (error) {
				console.error("Error fetching NFT data:", error);
			}
		}

		fetchData();
	}, []);

	// const { nfts, isLoading } = useNFTsData(
	// 	"0xe5442aE87E0fEf3F7cc43E507adF786c311a0529",
	// 	"eth-mainnet"
	// );
	// console.log(nfts);
	// const [AIData, setAIData] = useState("");
	const [_, setModelAI] = useRecoilState(windowaiState);
	const { disconnect } = useDisconnect();
	// const nftData = nfts?.ownedNfts?.slice(9);
	const [nft, selectNft] = useRecoilState(nftState);
	const [sel, setSel] = useState<null | number>(null);
	console.log(_, sel);
	const callWindowAI = async () => {
		const [{ message }] = await (window as any).ai.generateText(
			{
				messages: [{ role: "user", content: "can you say your model of ai" }],
			},
			{
				temperature: 0.7,
				maxTokens: 800,
				// model: modelAI,
				onStreamResult: (res: any) => {
					console.log(res, message);
				},
			}
		);
	};

	return (
		<div
			className={cn(
				className,
				"h-screen w-screen overflow-hidden flex flex-col text-primary pt-5 relative " // bg-secondary
			)}
		>
			<Tilt
				className="absolute w-[150vw] h-[150vh] animated-object -top-[25vh] -left-[25vw]"
				options={defaultOptions}
			>
				<img
					className="absolute w-full h-full top-0 left-0"
					src={images.cosmos}
					alt=""
				/>
			</Tilt>

			<div className="flex flex-col max-w-[60vw] relative z-[1]">
				{" "}
				<div
					className={cn(
						"flex flex-col sm:flex-row md:flex-col lg:flex-row",
						"w-fit mx-auto gap-5 mt-5"
					)}
				>
					<div
						className={cn(
							"flex flex-wrap max-w-[600px] bg-transparent gap-5 max-h-[calc(100vh-290px)] pr-2",
							"overflow-y-scroll scrollbar scrollbar-thumb-[#9B1A9D]"
						)}
					>
						{allNfts && allNfts.length > 0 ? (
							allNfts?.map((dd) => {
								return dd.nft_data.map((el, i) => {
									const src = getNormalizedImageUrl(el.external_data?.image);
									const isVideo = src?.toLowerCase().endsWith(".mp4");
									if (!el.external_data?.image) return;
									if (isVideo) {
										return (
											<video
												onClick={() => {
													if (!el.external_data.attributes) {
														toast(
															"Seems this 1 aint wanna talk 2 you, pls select your real nft friend"
														);
														return;
													}
													console.log(JSON.stringify(el));
													selectNft(el);
													setSel(i);
												}}
												key={i}
												className={cn(
													"relative w-full z-[1] group-hover:scale-[1.05] duration-500",
													"h-full max-h-[500px] lg:max-h-[250px]"
												)}
												controls
											>
												<source src={src} type="video/mp4" />
											</video>
										);
									} else {
										// const getSelected = nft?.find((nf) => nf === el.id);
										if (i === 8)
											return (
												<div className="items-center relative">
													<QrCode
														key={i}
														onClick={() => {
															if (!el.external_data.attributes) {
																toast(
																	"Seems this 1 aint wanna talk 2 you, pls select your real nft friend"
																);
																return;
															}
															console.log(JSON.stringify(el));
															selectNft(el);
															setSel(i);
														}}
														className={cn(
															"mx-auto w-[150px] md:w-[150px] h-[200px] cursor-pointer relative -top-5 right-3"
															// getSelected && "border-[4px] border-blue-400"
														)}
													/>
												</div>
											);
										return (
											<img
												key={i}
												onClick={() => {
													if (!el.external_data.attributes) {
														toast(
															"Seems this 1 aint wanna talk 2 you, pls select your real nft friend"
														);
														return;
													}
													console.log(JSON.stringify(el));
													selectNft(el);
													setSel(i);
												}}
												className={cn(
													"mx-auto w-[150px] md:w-[150px] h-[200px] cursor-pointer border border-demo-secondary",
													nft && "border-[4px] border-blue-400"
												)}
												src={getNormalizedImageUrl(src)}
												alt=""
											/>
										);
									}
								});
							})
						) : (
							<span className="m-auto text-[30px]">loading...</span>
						)}
					</div>
					<div className="flex flex-col gap-1">
						{TextModelIDC.map((el) => (
							<p
								key={el}
								className=" cursor-pointer"
								onClick={() => {
									setModelAI(el);
								}}
							>
								{el.replace(/_/g, " ")}
							</p>
						))}
					</div>
				</div>
				<div className="mx-auto  grid grid-cols-2 mt-14  w-fit gap-4">
					<Button
						className="text-black"
						// disabled={true}y
					>
						Connect Brain Print
					</Button>
					<Button disabled={!nft} className="text-black">
						Chose NFT Fren
					</Button>
					<Button disabled={!nft} className="text-black" onClick={callWindowAI}>
						Connect WindowAI
					</Button>
					<Button className="text-black" onClick={disconnect}>
						Disconnect
					</Button>
				</div>
			</div>
			<img
				className="absolute w-[45vw] top-10 -right-10 scale-[1.6]"
				src={images.catHead}
				alt=""
			/>
		</div>
	);
}
