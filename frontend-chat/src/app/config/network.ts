import { images } from "shared/assets";
import { mainnet } from "wagmi";
import {
	avalanche,
	bsc,
	optimism,
	polygon,
	arbitrum,
	celo,
	zkSync,
} from "wagmi/chains";

export const networkData = [
	{
		icon: images.network_1,
		name: mainnet.nativeCurrency.symbol,
		id: mainnet.id,
		nftNetwork: "eth-mainnet",
	},
	{
		icon: images.network_3,
		name: bsc.nativeCurrency.name,
		id: bsc.id,
		nftNetwork: "eth-mainnet",
	},
	{
		icon: images.network_2,
		name: "Polygon",
		id: polygon.id,
		nftNetwork: "polygon-mainnet",
	},
	{
		icon: images.catHead,
		name: optimism.network,
		id: optimism.id,
		nftNetwork: "opt-mainnet",
	},
	{
		icon: images.nova,
		name: "Arbitrum Nova",
		id: 42170,
		nftNetwork: "eth-mainnet",
	},
	{
		icon: images.catHead,
		name: avalanche.nativeCurrency.symbol,
		id: avalanche.id,
		nftNetwork: "eth-mainnet",
	},
	{
		icon: images.catHead,
		name: arbitrum.network,
		id: arbitrum.id,
		nftNetwork: "arb-mainnet",
	},
	{
		icon: images.celo,
		name: celo.network,
		id: celo.id,
		nftNetwork: "eth-mainnet",
	},
	{
		icon: images.zk,
		name: zkSync.network,
		id: zkSync.id,
		nftNetwork: "eth-mainnet",
	},
	{
		icon: images.catHead,
		name: "Near",
		id: -1,
		nftNetwork: "eth-mainnet",
	},
];
