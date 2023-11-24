import axios, { AxiosResponse } from "axios";
import { chains } from "shared/models";
import {COVALENT_API_KEY} from "../../../app/config/variables"

interface APIResponse {
	[chain: string]: AxiosResponse;
}

export const getAllNfts = async (address: string): Promise<APIResponse> => {
	const apiKey = COVALENT_API_KEY.toString();
	const responses: APIResponse = {};
	const successfulRequests: string[] = [];
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
};
