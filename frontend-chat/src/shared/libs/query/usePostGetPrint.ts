import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

async function postGetPrintMutation(variables: {
	contractAddr: string;
	tokenId: number | string;
}): Promise<string> {
	const apiUrl = "http://161.35.234.141/print/getLast";

	const { data } = await axios.post(apiUrl, variables);

	return data; // Assuming the response is a string, adjust as needed
}

interface usePostGetPrintReturn {
	postGetPrint: (
		contractAddr: string,
		tokenId: number | string
	) => Promise<string>;
	isLoading: boolean;
	error: unknown;
}

export function usePostGetPrint(): usePostGetPrintReturn {
	const queryClient = useQueryClient();
	const mutation = useMutation<
		string,
		Error,
		{ contractAddr: string; tokenId: number | string }
	>(postGetPrintMutation, {
		onSuccess: (data) => {
			// Invalidate relevant queries if needed
			queryClient.invalidateQueries(`check-owner-${data}`);
		},
	});

	return {
		postGetPrint: (contractAddr, tokenId) =>
			mutation.mutateAsync({ contractAddr, tokenId }),
		isLoading: mutation.isLoading,
		error: mutation.error,
	};
}
