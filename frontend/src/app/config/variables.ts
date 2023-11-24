/*@ts-ignore*/
export const getEnvVar = (key: string) => {
	const env = import.meta.env[key];
	if (env === undefined) {
		console.error(`Env variable ${key} is required`);
	}

	return env || "";
};

export const RPC_ETHER = getEnvVar("VITE_RPC_ETHER");
export const RPC_BNB = getEnvVar("VITE_RPC_BNB");
export const RPC_POLYGON = getEnvVar("VITE_RPC_POLYGON");
export const RPC_POLYGON_MUMBAI = getEnvVar("VITE_RPC_POLYGON_MUMBAI");

export const OPENAI_API_KEY = getEnvVar("VITE_OPENAI_API_KEY");
export const COVALENT_API_KEY = getEnvVar("VITE_COVALENT_API_KEY");
export const CONTRACT_ADDRESS = getEnvVar("VITE_CONTRACT_ADDRESS");
export const FILTERED_CONTRACTS = getEnvVar("VITE_FILTERED_CONTRACTS");

export const RPC_NETWORK: Record<number, string> = {
	1: RPC_ETHER,
	56: RPC_BNB,
	137: RPC_POLYGON,
	80001: RPC_POLYGON_MUMBAI
};
