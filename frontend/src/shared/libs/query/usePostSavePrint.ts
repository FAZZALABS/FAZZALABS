import { useMutation, useQueryClient } from "react-query";

import axios from "axios";

async function postSavePrintMutation(variables: {
	contractAddr: string;
	tokenId: number | string;
	print: unknown;
}): Promise<string> {
	const apiUrl = "https://brainprint.app/api/print/savePrint";
	//const apiUrl = "http://localhost:9000/print/savePrint";
	//const apiUrl = "https://devxindiabrainprintbackend-production.up.railway.app/print/savePrint";
	                

	const { data } = await axios.post(apiUrl, variables);

	return data;
}

interface usePostSavePrintReturn {
	postSavePrint: (
		contractAddr: string,
		tokenId: number | string,
		print: unknown
	) => Promise<string>;
	isLoading: boolean;
	error: unknown;
}

export function usePostSavePrint(): usePostSavePrintReturn {
	const queryClient = useQueryClient();
	const mutation = useMutation<
		string,
		Error,
		{ contractAddr: string; tokenId: number | string; print: unknown }
	>(postSavePrintMutation, {
		onSuccess: (data) => {
			queryClient.invalidateQueries(`check-print-${data}`);
		},
	});

	return {
		postSavePrint: (contractAddr, tokenId, print) =>
			mutation.mutateAsync({ contractAddr, tokenId, print }),
		isLoading: mutation.isLoading,
		error: mutation.error,
	};
}
