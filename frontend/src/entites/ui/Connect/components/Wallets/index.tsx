import {
	connectorMetamask,
	walletConnect,
	safeConnect,
	coinbaseConnect,
} from "app/config/blockchain";

import { useConnect } from "wagmi";

import { useRecoilState, useRecoilValue } from "recoil";

import { images } from "shared/assets";
import { themeState, walletState } from "shared/libs/recoil";
import { ArrBottomIcon, ArrTopIcon } from "shared/UI/Icons";

import cn from "classnames";

interface IProps {
	className?: string;
	// chainId: number;
	close: () => void;
}

export function Wallets({ className, close }: IProps) {
	const [open, setOpen] = useRecoilState(walletState);

	const theme = useRecoilValue(themeState);

	const { connect } = useConnect();

	return (
		<div className={cn("py-4 px-6 gap-6 relative z-[100000]", className)}>
			<div className="flex-row justify-between items-center">
				<h4 className="text-base font-[DM+Sans]">Select Wallet</h4>
				{open ? (
					<ArrTopIcon
						className={cn(
							theme === "blue" ? "text-secondary" : "text-secondary-revert"
						)}
						onClick={() => setOpen(!open)}
					/>
				) : (
					<ArrBottomIcon
						className={cn(
							theme === "blue" ? "text-secondary" : "text-secondary-revert"
						)}
						onClick={() => setOpen(!open)}
					/>
				)}
			</div>
			<div
				className={cn(
					"grid grid-cols-2 gap-x-[14px] gap-y-[50px] duration-500"
				)}
			>
				<button
					onClick={() => {
						connect({ connector: connectorMetamask });
						close();
						setOpen(true);
					}}
					className="flex flex-col gap-2 items-center"
				>
					<img className="" src={images.metamaskWallet} alt="" />
					Metamask
				</button>
				<button
					onClick={() => {
						connect({ connector: coinbaseConnect });
						close();
						setOpen(true);
					}}
					className="flex flex-col gap-2 items-center"
				>
					<img className="" src={images.coinbaseWallet} alt="" />
					Coinbase
				</button>
				<button
					onClick={() => {
						connect({ connector: safeConnect });
						close();
						setOpen(true);
					}}
					className="flex flex-col gap-2 items-center"
				>
					<img className="" src={images.safepalWallet} alt="" />
					Safepal
				</button>
				<button
					onClick={() => {
						connect({ connector: walletConnect });
						close();
						setOpen(true);
					}}
					className="flex flex-col gap-2 items-center"
				>
					<img className="" src={images.walletConnect} alt="" />
					Wallet Connect
				</button>
			</div>
		</div>
	);
}
