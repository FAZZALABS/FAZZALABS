/* eslint-disable no-mixed-spaces-and-tabs */
import { useAccount } from "wagmi";

import { useRecoilValue } from "recoil";

import { Wallets } from "./components/Wallets";

import { shortenAddress } from "shared/utils";
import { useDropdown } from "shared/hooks/useDropdown";
import { CloseIcon } from "shared/UI/Icons";
import { themeState } from "shared/libs/recoil";

import cn from "classnames";

interface IProps {
	className?: string;
}

export function Connect({ className }: IProps) {
	const theme = useRecoilValue(themeState);
	const { close, dropdownRef, isOpen, open } = useDropdown();
	const { address } = useAccount();
	return (
		<div ref={dropdownRef} className={cn(" w-full", className)}>
			<button
				disabled={isOpen}
				onClick={open}
				className={cn(
					"text-[24px] leading-[100%]",
					"duration-500 py-4 px-0 sm:px-6 w-full",
					theme === "blue" ? "text-secondary" : "text-secondary-revert",
					isOpen
						? "bg-[#242D51]"
						: `hover:bg-[#DDF3FF] ${
								theme === "blue"
									? "bg-[#A6DFFF] shadow-[0px_0px_4px_0px_#8BD5FF,0px_0px_16px_0px_#0047FF]"
									: "bg-[#36A834] shadow-[0px_0px_4px_0px_#36A834,0px_0px_16px_0px_#5BCF24]"
						  }`
				)}
			>
				{address ? shortenAddress(address) : "CONNECT WALLET"}
			</button>
			<article
				className={cn(
					"w-fit min-w-[340px] sm:min-w-[400px] flex flex-col h-fit ",
					"fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2",
					"rounded-[10px] duration-500 pb-6 px-4 pt-4 z-[1] border",
					theme === "blue"
						? "bg-primary border-secondary"
						: "bg-primary-revert border-secondary-revert",
					isOpen ? "opacity-[1] scale-y-[1]" : "opacity-[0] scale-y-[0]"
				)}
			>
				<div
					className={cn(
						"flex-row items-center justify-between p-4 relative ",
						"after:absolute after:bottom-0 after:-left-4 after:w-[calc(100%+32px)] after:h-[1px] after:bg-black"
					)}
				>
					<h3 className="text-xl text-[#212121] font-[DM+Sans] font-bold">
						Connect Account
					</h3>
					<CloseIcon
						className={cn(
							theme === "blue" ? "text-secondary" : "text-secondary-revert"
						)}
						onClick={close}
					/>
				</div>
				<Wallets close={close} />
			</article>
		</div>
	);
}
