import { useAccount } from "wagmi";

import { useRecoilValue } from "recoil";

import { DisConnected, User } from "pages";

import { Footer, Header } from "widgets";

import { PrinText } from "shared/UI/Typer";
import { themeState } from "shared/libs/recoil";

import cn from "classnames";

interface IProps {
	className?: string;
}

export function AppRoutes({ className }: IProps) {
	const { address } = useAccount();

	const theme = useRecoilValue(themeState);

	return (
		<article
			className={cn(
				"flex flex-col lg:h-screen overflow-x-hidden relative",
				"w-screen min-h-screen p-3 3xl:p-6",
				theme === "blue" ? "bg-secondary" : "bg-secondary-revert",
				className
			)}
		>
			<span
				className={cn(
					"absolute left-1/2 -translate-x-1/2 top-[9px] sm:top-[7px] z-[5]",
					"px-4 text-base sm:text-[24px] leading-[100%] uppercase",
					theme === "blue"
						? "bg-secondary text-primary textShadow"
						: "bg-secondary-revert text-primary-revert textShadow-revert"
				)}
			>
				www.aiam.eth
			</span>
			<div
				className={cn(
					"h-full flex-1 flex flex-col p-2 border",
					theme === "blue"
						? "border-primary boxShadow"
						: "border-primary-revert boxShadow-revert"
				)}
			>
				<Header />
				{address ? <User /> : <DisConnected />}
				<Footer />
			</div>
			<PrinText
				className="mt-3 3xl:mt-6 leading-[80%]"
				text="HTTPS://WWW.BRAINPRINT.COM"
			/>
		</article>
	);
}
