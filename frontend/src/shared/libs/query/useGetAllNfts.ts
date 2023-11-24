import { useEffect, useState } from "react";

import { useQuery } from "react-query";

import { useAccount } from "wagmi";

import { BigNumber } from "ethers";

import axios from "axios";

import { chains } from "shared/models";
import { ISELNFT } from "shared/types/types";

import {COVALENT_API_KEY, FILTERED_CONTRACTS} from "../../../app/config/variables"

export function useGetNFTS(setAllNfts: any) {
	const [hasProcessedData, setHasProcessedData] = useState(false);

	const { address } = useAccount();
	
	function convertTo64BitString(value: string) {
		const decimalValue = BigNumber.from(value);
		const hexValue = decimalValue.toHexString().slice(2).padStart(16, "0");
		return `0x${hexValue}`;
	}

	const apiKey = COVALENT_API_KEY;

	const strFilteredContracts = FILTERED_CONTRACTS.toString().toLowerCase();

	const { data: responses } = useQuery(
		"getAllNfts", // Query key
		async () => {
			const successfulRequests: string[] = [];
			const responses: Record<string, any> = {};

			for (const chain in chains) {
				try {
					if (successfulRequests.includes(chain)) {
						continue;
					}

					let url = `${chains[chain]}${address}/balances_nft/`;

					if (
						chain === "bsc-testnet" ||
						chain === "polygon-zkevm-mainnet" ||
						chain === "matic-mumbai" ||
						chain === "arbitrum-nova-mainnet" ||
						chain === "base-mainnet" ||
						chain === "optimism-mainnet"
					) {
						url += "?with-uncached=true";
					}

					const response = await axios.get(url, {
						headers: {
							"Content-Type": "application/json",
						},
						auth: {
							username: apiKey,
							password: "",
						},
					});
					responses[chain] = response;
					successfulRequests.push(chain);
				} catch (error) {
					console.error(`Error fetching data for ${chain}:`, error);
				}
			}

			return responses;
		}
	);
	useEffect(() => {
		if (!responses || hasProcessedData) return;
		async function fetchData() {
			try {
				for (const chain in responses) {
					const response = responses[chain];
					if (response.status === 200) 
					{
						const filteredData = new Array();

						for(var idx = 0; idx < response.data.data.items.length; idx++){
							const elem = response.data.data.items[idx];
							if(strFilteredContracts.indexOf(elem.contract_address.toLowerCase()) == -1)
							{
								filteredData.push(elem);
							}
							else
							{
								console.log('filtered NFT: ' + JSON.stringify(elem));
							}
						}

						const nftData = filteredData;

						let network = "";
						if (chain === "eth-mainnet") {
							network = "eth-mainnet";
						} else if (chain === "polygon-zkevm-mainnet") {
							network = "polygon-zkevm-mainnet";
						} else if (chain === "matic-mumbai") {
							network = "matic-mumbai";
						} else if (chain === "arbitrum-nova-mainnet") {
							network = "arbitrum-nova-mainnet";
						} else if (chain === "optimism-mainnet") {
							network = "optimism-mainnet";
						} else if (chain === "bsc-testnet") {
							network = "bsc-testnet";
						} else if (chain === "base-mainnet") {
							network = "base-mainnet";
						}
						const nftsWithNetwork = nftData.map((item: any) => ({
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
						setAllNfts((prev: any) => [...prev, ...nftsWithNetwork]);
					} else {
						console.error(
							`Error fetching data for ${chain}: ${response.statusText}`
						);
					}
				}
				setHasProcessedData(true);
			} catch (error) {
				console.error("Error fetching NFT data:", error);
			}
		}

		fetchData();
	}, [responses, hasProcessedData]);
}
