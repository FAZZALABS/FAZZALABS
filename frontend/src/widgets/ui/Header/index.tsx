import { useState } from "react";

import { useAccount } from "wagmi";

import { useRecoilState } from "recoil";

import { Wallet } from "entites/ui/Wallet";
import { Connect } from "entites/ui/Connect";

import {
	chainState,
	LOCALE_STORAGE_THEME_KEY,
	themeState,
} from "shared/libs/recoil";

import { HeaderHandIcon, ThemeIcon } from "shared/UI/Icons";
import { PrinText } from "shared/UI/Typer";

import cn from "classnames";

interface IProps {
	className?: string;
}

export function Header({ className }: IProps) {
	const { address } = useAccount();
	const [openWallet, setOpenWallet] = useState(false);
	const [chainId, setChainId] = useRecoilState<number | null>(chainState);

	const [theme, setTheme] = useRecoilState(themeState);

	const toggleTheme = () => {
		const newTheme = theme === "blue" ? "green" : "blue";
		setTheme(newTheme);
		localStorage.setItem(LOCALE_STORAGE_THEME_KEY, newTheme);
	};

	console.log(openWallet);
	return (
		<article
			className={cn(
				"w-full flex items-center justify-between relative sm:pr-3",
				className
			)}
		>
			<span
				className={cn(
					"absolute w-full h-[1px] left-0 top-0",
					theme === "blue"
						? "bg-primary boxShadow"
						: "bg-primary-revert boxShadow-revert"
				)}
			></span>
			<span
				className={cn(
					"hidden sm:block absolute w-full h-[1px] left-0 bottom-0",
					theme === "blue"
						? "bg-primary boxShadow"
						: "bg-primary-revert boxShadow-revert"
				)}
			></span>
			<span
				className={cn(
					"absolute h-full w-[1px] left-0 top-0",
					theme === "blue"
						? "bg-primary boxShadow"
						: "bg-primary-revert boxShadow-revert"
				)}
			></span>
			<span
				className={cn(
					"absolute h-full w-[1px] right-0 top-0",
					theme === "blue"
						? "bg-primary boxShadow"
						: "bg-primary-revert boxShadow-revert"
				)}
			></span>
			<div className="flex-row items-center gap-5">
				<HeaderHandIcon />
				<PrinText
					text="AI'AM AIDUTAINMENT FOR AITREPRENEURS"
					className="mb-2 uppercase text-center hidden lg:block"
				/>
			</div>
			<div className="dropShadow-none grid grid-cols-[auto_auto] items-center gap-3 sm:gap-8">
				<ThemeIcon
					className={cn(
						"w-[45px] h-[45px]",
						theme !== "blue" ? "text-primary" : "text-primary-revert"
					)}
					onClick={toggleTheme}
				/>
				{address ? (
					<Wallet
						chainId={chainId}
						setChainId={setChainId}
						setOpenWallet={setOpenWallet}
					/>
				) : (
					<Connect className="hidden sm:block" />
				)}
			</div>
		</article>
	);
}
