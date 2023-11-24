import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { fileURLToPath, URL } from "url";
import tsconfigPaths from "vite-tsconfig-paths";
// import basicSsl from "@vitejs/plugin-basic-ssl";
const baseURL = fileURLToPath(new URL("./src", import.meta.url));

export default defineConfig({
	plugins: [nodePolyfills(), react(), tsconfigPaths()],
	define: {
		"process.env": {},
	},
	build: {
		commonjsOptions: {
			transformMixedEsModules: true,
		},
		target: "esnext",
	},
	resolve: {
		alias: [
			{
				find: "@assets",
				replacement: `${baseURL}/assets`,
			},
			{
				find: "@icons",
				replacement: `${baseURL}/components/Icons`,
			},
		],
	},
});
