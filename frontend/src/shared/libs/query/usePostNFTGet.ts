import axios from "axios";

import { useMutation, useQueryClient } from "react-query";
import { INFT } from "shared/types/types";

async function PostNFTGetMutation(url: { url: string }): Promise<INFT> {
	// const apiUrl = "https://brainprint.app/api/nft/get";
	const apiUrl = "http://localhost:9000/nft/get";
	//const apiUrl = "https://devxindiabrainprintbackend-production.up.railway.app/nft/get";

	const { data } = await axios.post(apiUrl, url);

	return data;
}

interface useCheckOwnerReturn {
	PostNFTGet: (url: string) => Promise<INFT>;
	isLoading: boolean;
	error: unknown;
}

export function usePostNFTGet(): useCheckOwnerReturn {
	const queryClient = useQueryClient();
	const mutation = useMutation<INFT, Error, { url: string }>(
		PostNFTGetMutation,
		{
			onSuccess: (data) => {
				// Invalidate relevant queries if needed
				queryClient.invalidateQueries(`check-owner-${data}`);
			},
		}
	);

	return {
		PostNFTGet: (url) => mutation.mutateAsync({ url }),
		isLoading: mutation.isLoading,
		error: mutation.error,
	};
}
