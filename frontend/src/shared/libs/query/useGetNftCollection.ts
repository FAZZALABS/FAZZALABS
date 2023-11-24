/* eslint-disable */
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import { INFT } from "shared/types/types";

const nftQuery = (
	address: string,
	network: string
): [string, () => Promise<any>] => {
	const apiKey = "kfiRbmmJ7riYqSdnppbv7R7muznUXt09";
	const endpoint = `https://${network}.alchemyapi.io/v2/${apiKey}`;

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
	refetch: any;
}
export function useNFTsData(
	address: string,
	network: string
): useTokensDataReturn {
	const [tokensKey, tokensFetcher] = nftQuery(address, network);
	const { data, isLoading, error } = useQuery(tokensKey, tokensFetcher);
	const queryClient = useQueryClient();

	// Define a function to refetch the query
	const refetch = () => {
		queryClient.invalidateQueries(tokensKey); // Invalidate the query
	};
	return {
		nfts: data,
		isLoading,
		error,
		refetch,
	};
}
//?-------------------
