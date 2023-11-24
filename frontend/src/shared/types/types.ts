
export interface INFT {
	balance: string;
	contract: {
		address: string;
	};
	error?: string;
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
		attributes: { value: string; trait_type: string }[];
		compiler: string;
		date: number;
		description: string;
		dna: string;
		edition: number;
		image: string;
		name: string;
	};
	timeLastUpdated: string;
	title: string;
	tokenUri: {
		gateway: string;
		raw: string;
	};
}

export interface ISELNFT {
	balance: string;
	balance_24h: string;
	contract_address: string;
	token_id: string;
	defaultTokenId: string;
	token_url: string;
	original_owner: string;
	external_data: {
		name: string;
		description: string;
		asset_url: string;
		asset_file_extension: string;
		asset_mime_type: string;
		asset_size_bytes: string;
		image: string;
		image_256: string;
		image_512: string;
		image_1024: string;
		animation_url: null;
		external_url: null;
		attributes: { trait_type: string; value: string }[];
	};
	image_cached: boolean;
	asset_cached: boolean;
	network?: string;
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

export interface NFT {
	error?: string;
	contract_name: string;
	contract_ticker_symbol: string;
	contract_address: string;
	supports_erc: string[];
	is_spam: boolean;
	balance: string;
	balance_24h: string;
	type: string;
	nft_data: [
		{
			contract_address: string;
			token_id: string;
			defaultTokenId: string;
			token_url: string;
			balance: string;
			balance_24h: string;
			original_owner: string;
			external_data: {
				name: string;
				description: string;
				asset_url: string;
				asset_file_extension: string;
				asset_mime_type: string;
				asset_size_bytes: string;
				image: string;
				image_256: string;
				image_512: string;
				image_1024: string;
				animation_url: null;
				external_url: null;
				attributes: { trait_type: string; value: string }[];
			};
			image_cached: boolean;
			asset_cached: boolean;
		}
	];
	last_transfered_at: string;
	network: string;
}
