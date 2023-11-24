import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { ISELNFT } from "shared/types/types";

interface IResponse {
	ipfs: string;
	tokenId: string;
	contract: string;
	prints: any[];
	_id: string;
	minted: boolean;
	_v: number;
}

async function checkOwnerMutation(variables: {
	selectedNft: ISELNFT;
	address: string;
}): Promise<IResponse> {
	const { selectedNft, address } = variables;
	const apiUrl = "https://brainprint.app/api/nft/checkOwner";
	//const apiUrl = "http://localhost:9000/nft/checkOwner";
	//const apiUrl = "https://devxindiabrainprintbackend-production.up.railway.app/nft/checkOwner";


	const requestData = {
		data: JSON.stringify(selectedNft),
		// owner: address,
		owner: address!,
	};

	const { data } = await axios.post(apiUrl, requestData);

	return data; // Assuming the response is a string, adjust as needed
}

interface useCheckOwnerReturn {
	checkOwner: (selectedNft: ISELNFT, address: string) => Promise<IResponse>;
	isLoading: boolean;
	error: unknown;
}

export function useCheckOwner(): useCheckOwnerReturn {
	const queryClient = useQueryClient();
	const mutation = useMutation<
		IResponse,
		Error,
		{ selectedNft: ISELNFT; address: string }
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
