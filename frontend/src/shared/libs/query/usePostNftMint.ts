import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { ISELNFT } from "shared/types/types";

async function mintNftMutation(variables: {
	nft: ISELNFT;
	chain: number;
}): Promise<string> {
	const { nft, chain } = variables;
	const saveUrl = "https://brainprint.app/api/nft/save";
	//const saveUrl = "http://localhost:9000/nft/save";
	//const saveUrl = "https://devxindiabrainprintbackend-production.up.railway.app/nft/save";

	const { data } = await axios.post(saveUrl, {
		data: {
			chainId: chain,
			nft,
		},
	});
	return data; // Assuming the response is a string, adjust as needed
}

interface useMintReturn {
	mintNft: (nft: ISELNFT, chain: number) => Promise<string>;
	isLoading: boolean;
	error: unknown;
}

export function usePostNftMint(): useMintReturn {
	const queryClient = useQueryClient();
	const mutation = useMutation<string, Error, { nft: ISELNFT; chain: number }>(
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
