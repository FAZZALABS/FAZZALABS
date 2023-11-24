import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { INFT } from "./types";
// import { INFT } from "shared/types/types";

async function checkOwnerMutation(variables: {
	selectedNft: INFT;
	address: string;
}): Promise<string> {
	const { selectedNft, address } = variables;
	const apiUrl = "http://161.35.234.141/nft/checkOwner";
	const requestData = {
		data: selectedNft,
		owner: address,
	};

	const { data } = await axios.post(apiUrl, requestData);

	return data; // Assuming the response is a string, adjust as needed
}

interface useCheckOwnerReturn {
	checkOwner: (selectedNft: INFT, address: string) => Promise<string>;
	isLoading: boolean;
	error: unknown;
}

export function useCheckOwner(): useCheckOwnerReturn {
	const queryClient = useQueryClient();
	const mutation = useMutation<
		string,
		Error,
		{ selectedNft: INFT; address: string }
	>(checkOwnerMutation, {
		onSuccess: (data) => {
			// Invalidate relevant queries if needed
			queryClient.invalidateQueries(`check-owner-${data}`);
		},
	});

	return {
		checkOwner: (selectedNft, address) =>
			mutation.mutateAsync({ selectedNft, address }),
		isLoading: mutation.isLoading,
		error: mutation.error,
	};
}
