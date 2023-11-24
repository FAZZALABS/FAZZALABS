import axios from "axios";
import { useQuery } from "react-query";
import { INFTOpensea } from "./types";
// import { INFTOpensea } from "shared/types/types";

const nftQuery = (
	address: string,
	network: string
): [string, () => Promise<any>] => {
	const apiKey = "4e2a4680ddb345779b0818775f10524f";
	const endpoint = "https://api.opensea.io/v2";

	return [
		`user-tokes`,
		async () => {
			const response = await axios.get(
				`${endpoint}/chain/${network}/account/${address}/nfts`,
				{
					headers: {
						// accept: "application/json",
						"X-API-KEY": apiKey,
					},
				}
			);
			return response.data;
		},
	];
};

interface useTokensDataReturn {
	nfts: { nfts: INFTOpensea[] };
	isLoading: boolean;
	error: unknown;
}

export function useNFTsDataOPensea(
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
