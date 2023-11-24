import { createRoot } from "react-dom/client";
import { WagmiConfig } from "wagmi";

import { QueryClient, QueryClientProvider } from "react-query";

import { RecoilRoot } from "recoil";

import { AppRoutes } from "app/App";

import { wagmiClient } from "app/config/blockchain";

import "./app/styles/style.css";
import "./app/styles/fonts.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
	<WagmiConfig client={wagmiClient}>
		<QueryClientProvider client={queryClient}>
			<RecoilRoot>
				{/* <HeliaProvider> */}
				<AppRoutes />
				{/* </HeliaProvider> */}
			</RecoilRoot>
		</QueryClientProvider>
		<ToastContainer
			className="bg-transparent flex"
			bodyClassName="flex flex-row-reverse rounded-[5px] bg-green-500 items-center"
			position="top-left"
			theme="dark"
			toastClassName="flex"
		/>
	</WagmiConfig>
);
//
