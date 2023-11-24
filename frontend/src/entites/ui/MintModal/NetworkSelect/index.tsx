/* eslint-disable no-mixed-spaces-and-tabs */
import { useNetwork, useSwitchNetwork } from "wagmi";

import { useRecoilValue } from "recoil";

import { toast } from "react-toastify";

import { CloseIcon } from "shared/UI/Icons";
import { themeState } from "shared/libs/recoil";
import { images } from "shared/assets";
import { ISELNFT } from "shared/types/types";

import cn from "classnames";
import { chainsMint } from "./chainMintData";

interface IProps {
	isOpen: boolean;
	close: () => void;
	selectedNft: ISELNFT;
	print: string;
	mintStart: any;
	load: boolean;
	mintContract: () => void;
	disableButton: boolean;
	mintDisable: boolean;
}

export function NetworkSelect({
	isOpen,
	close,
	mintContract,
	load,
	mintDisable,
}: IProps) {
	const { chain } = useNetwork();
	const id = chain?.id;

	const theme = useRecoilValue(themeState);
	const { switchNetwork, isSuccess } = useSwitchNetwork();
	isSuccess && toast.success("Network switched, start Mint!");

	const setNetwork = (id: number) => {
		switchNetwork!(id);
	};

	return (
		<>
			{load && (
				<img
					className={cn(
						"fixed top-[20px] left-1/2 scale-[1.1] -translate-x-1/2 z-[2005555]",
						"m-auto w-10 sm:w-[150px] h-10 sm:h-[150px]"
					)}
					src={images.spinner}
					alt=""
				/>
			)}
			<div
				className={cn(
					"fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 duration-500",
					"flex-row items-center gap-20 min-w-max",
					"py-10 sm:py-6 px-5 sm:px-10 rounded-[30px] z-[5]",
					theme === "blue"
						? "bg-primary shadow-[0px_0px_4px_0px_#8BD5FF,0px_0px_16px_0px_#0047FF] border-2 border-secondary"
						: "bg-primary-revert shadow-[0px_0px_4px_0px_#36A834,0px_0px_16px_0px_#5BCF24] border-secondary-revert",
					isOpen
						? "opacity-[1] scale-y-[1] top-0 "
						: "opacity-[0] scale-y-[0] -top-[120px]"
				)}
			>
				<div
					onClick={close}
					className={cn(
						"bg-white items-center justify-center rounded-full",
						"absolute -top-6 -right-3 sm:-top-8 sm:-right-8 cursor-pointer"
					)}
				>
					<CloseIcon />
				</div>
				<div className="gap-3 items-center">
					<h3 className="text-2xl max-w-[290px] sm:max-w-max text-center">
						Select network for mint
					</h3>
					<div
						className={cn(
							"grid grid-cols-1 sn:grid-cols-2 lg:grid-cols-4 justify-around items-center",
							"min-w-max gap-2 sm:gap-4 mt-2 sm:mt-4"
						)}
					>
						{chainsMint.map((chain) => (
							<div
								key={chain.id}
								className={cn(
									"text-lg font-medium",
									"items-center gap-2 cursor-pointer px-3 py-2 rounded-md duration-500",
									chain.id === id &&
										"border-2 border-secondary text-secondary bg-[#7aceff] shadow-[0px_0px_4px_0px_#8BD5FF,0px_0px_16px_0px_#0047FF]",
									chain.id !== 80001 && "bg-slate-600" 
								)}
								onClick={() => {
									if(chain.id === 80001) {
										setNetwork(chain.id)
									}
									else
										return;
									}}
								>
								<img
									className="w-7 h-7 lg:w-10 lg:h-10 rounded-full"
									src={chain.img}
									alt=""
								/>
								{chain.name}
							</div>
						))}
					</div>
					<button
						disabled={load || mintDisable}
						className={cn(
							"w-full py-3 px-6 duration-500 uppercase sm:w-[250px] text-white text-2xl",
							theme === "blue"
								? "bg-secondary shadow-[0px_0px_4px_0px_#8BD5FF,0px_0px_16px_0px_#0047FF]"
								: "bg-secondary-revert shadow-[0px_0px_4px_0px_#36A834,0px_0px_16px_0px_#5BCF24]"
						)}
						onClick={mintContract}
					>
						mint
					</button>
				</div>
			</div>
		</>
	);
}
