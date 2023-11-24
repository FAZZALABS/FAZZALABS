import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { INFT } from "./types";
// import { INFT } from "shared/types/types";

async function mintNftMutation(variables: {
	nft: INFT;
	chain: number;
}): Promise<string> {
	const { nft, chain } = variables;
	const { data } = await axios.post(`http://137.184.84.74/nft/save`, {
		data: {
			chainId: chain,
			nft,
		},
	});
	return data; // Assuming the response is a string, adjust as needed
}

interface useMintReturn {
	mintNft: (nft: INFT, chain: number) => Promise<string>;
	isLoading: boolean;
	error: unknown;
}

export function usePostNftMint(): useMintReturn {
	const queryClient = useQueryClient();
	const mutation = useMutation<string, Error, { nft: INFT; chain: number }>(
		mintNftMutation,
		{
			onSuccess: (data) => {
				// Invalidate relevant queries if needed
				queryClient.invalidateQueries(`mint-nft-${data}`);
			},
		}
	);

	return {
		mintNft: (nft, chain) => mutation.mutateAsync({ nft, chain }),
		isLoading: mutation.isLoading,
		error: mutation.error,
	};
}
