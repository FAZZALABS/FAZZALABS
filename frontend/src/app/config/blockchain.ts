import { configureChains, createClient } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";

import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import {
	polygon,
	polygonMumbai
	// bsc,
	// mainnet,
	// arbitrum,
	// avalanche,
	// optimism,
} from "@wagmi/chains";

import { RPC_NETWORK } from "./variables";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { SafeConnector } from "wagmi/connectors/safe";
export const chainsActive = [
	// mainnet,
	// bsc,
	polygon,
	polygonMumbai,
	// optimism,
	// avalanche,
	// arbitrum,
];

export const { chains, provider, webSocketProvider } = configureChains(
	[...chainsActive],
	[
		publicProvider(),
		jsonRpcProvider({
			rpc: (chain) => ({
				http: RPC_NETWORK[chain.id],
			}),
			stallTimeout: 1000,
		}),
	]
);

export const connectorMetamask = new MetaMaskConnector({
	chains,
});
export const walletConnect = new WalletConnectConnector({
	chains,
	options: {
		projectId: "73b1f753f969c7e0dec6f2dec3ab2b1c",
	},
});
export const coinbaseConnect = new CoinbaseWalletConnector({
	chains,
	options: {
		appName: "wagmi",
	},
});
export const safeConnect = new SafeConnector({
	chains,
	options: {
		// allowedDomains: [/gnosis-safe.io$/, /app.safe.global$/],
		debug: false,
	},
});
export const wagmiClient = createClient({
	autoConnect: true,
	connectors: [connectorMetamask, walletConnect, coinbaseConnect, safeConnect],
	provider,
	webSocketProvider,
});
