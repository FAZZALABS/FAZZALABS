const isIPFS = (url: string) => url.startsWith("ipfs://");
export const getNormalizedImageUrl = (image: string | undefined) => {
	if (image && isIPFS(image)) {
		const ipfsHash = image.replace("ipfs://", "");
		return `https://ipfs.io/ipfs/${ipfsHash}`;
	}
	return image;
};
