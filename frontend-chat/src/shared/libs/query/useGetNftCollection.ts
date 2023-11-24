/* eslint-disable */
import axios from "axios";
import { useQuery } from "react-query";
import { INFT } from "./types";
// import { INFT } from "shared/types/types";

const nftQuery = (
	address: string,
	network: string
): [string, () => Promise<any>] => {
	const apiKey = "kfiRbmmJ7riYqSdnppbv7R7muznUXt09";
	const endpoint = `https://${network}.alchemyapi.io/v2/${apiKey}`;
	console.log(endpoint);
	return [
		`user-tokens`,
		async () => {
			const { data } = await axios.get(`${endpoint}/getNFTs?owner=${address}`);
			return data;
		},
	];
};

interface useTokensDataReturn {
	nfts: { ownedNfts: INFT[] };
	isLoading: boolean;
	error: any;
}
export function useNFTsData(
	address: string,
	network: string
): useTokensDataReturn {
	const [tokensKey, tokensFetcher] = nftQuery(address, network);
	const { data, isLoading, error } = useQuery(tokensKey, tokensFetcher);

	return {
		nfts: data,
		isLoading,
		error,
	};
}
//?-------------------
