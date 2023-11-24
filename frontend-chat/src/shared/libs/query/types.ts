export interface INFT {
	balance: string;
	contract: {
		address: string;
	};
	contractMetadata: {
		contractDeployer: string;
		deployedBlockNumber: number;
		name: string;
		openSea: {
			collectionName: string;
			collectionSlug: string;
			description: string;
			externalUrl: string;
			floorPrice: number;
			imageUrl: string;
			lastIngestedAt: string;
			twitterUsername: string;
			safelistRequestStatus?: string;
			discordUrl?: string;
			bannerImageUrl?: string;
		};
		symbol: string;
		tokenType: string;
		totalSupply: string;
	};
	description: string;
	id: { tokenId: string; tokenMetadata: { tokenType: string } };

	media: {
		bytes: number;
		format: string;
		gateway: string;
		raw: string;
		thumbnail: string;
	}[];
	metadata: {
		attributes?: { value: string; trait_type: string }[];
		compiler?: string;
		date?: number;
		description?: string;
		dna?: string;
		edition?: number;
		image?: string;
		name?: string;
	};
	timeLastUpdated: string;
	title: string;
	tokenUri: {
		gateway: string;
		raw: string;
	};
}

export interface INFTOpensea {
	identifier: number | string;
	collection: string;
	contract: string;
	token_standard: string;
	name: string;
	description: string;
	image_url: string;
	metadata_url: string;
	created_at: string;
	updated_at: string;
	is_disabled: boolean;
	is_nsfw: boolean;
}

export const NETWORK_API_KEY = "network";
