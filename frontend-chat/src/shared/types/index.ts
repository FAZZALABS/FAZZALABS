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
	network?: string;
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
