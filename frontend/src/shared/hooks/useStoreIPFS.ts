import axios from "axios";

export const setStoreIPFS = async (
	data: string,
	setData: (el: string) => void
) => {
	try {
		const response = await axios.post(
			"https://api.pinata.cloud/pinning/pinJSONToIPFS",
			JSON.stringify({
				pinataContent: data,
				pinataOptions: {
					cidVersion: 0,
					wrapWithDirectory: false,
				},
			}),
			{
				headers: {
					Accept: "application/json",
					Authorization:
						"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4NzM5MGVjNi04NjRmLTQyOTAtYTU2Zi1jMjMzOWE3Yzk3NGQiLCJlbWFpbCI6ImlseWEwN2RldkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMTY2MWJiMTU3NzgyYjcyN2U5ZjIiLCJzY29wZWRLZXlTZWNyZXQiOiJhMzFiM2MzMDA5NTZhMWJjOTY0ZDNjZmZkNTZmOTQyMmY4MDg0ZDFhYjFjYWI4N2E4NjdhOTQwMmUzOTUxYTljIiwiaWF0IjoxNjk0NjAzNTgyfQ.ExLgpUeHNpakf1L5uUTmgvT_kwQqBCSwtIGCo_FiMBY", // Replace with your Pinata API key
					"Content-Type": "application/json",
				},
			}
		);
		setData(`https://ipfs.io/ipfs/${response?.data?.IpfsHash}`);
	} catch (error) {
		console.error("Error pinning to IPFS:", error);
	}
};
