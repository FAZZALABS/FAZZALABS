/* eslint-disable no-mixed-spaces-and-tabs */
import { useRecoilValue } from "recoil";

import { TypesButton } from "features/types";

import { CloseIcon } from "shared/UI/Icons";
import { images } from "shared/assets";
import { themeState } from "shared/libs/recoil";

import cn from "classnames";

interface IProps {
	active: TypesButton;
	className?: string;
	isOpen: boolean;
	windowClick: () => void;
	sendFree: () => void;
	close: () => void;
}

export function AISelect({
	isOpen,
	active,
	sendFree,
	windowClick,
	close,
}: IProps) {
	const theme = useRecoilValue(themeState);
	const exist = (window as any).ai;

	return (
		<div
			className={cn(
				"fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 duration-500",
				"md:flex-row items-center gap-[30px] lg:gap-20 min-w-max",
				"py-8 sm:py-8 lg:py-[60px] px-10 sm:px-[60px] lg:px-[100px] rounded-[30px] z-[5]",
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
					"bg-white items-center justify-center w-10 h-10 rounded-full",
					"absolute -top-6 -right-3 sm:-top-8 sm:-right-8 cursor-pointer"
				)}
			>
				<CloseIcon />
			</div>
			<div
				className={cn(
					"h-full flex gap-3 items-center justify-center min-w-max"
				)}
			>
				<button
					// disabled={ex ? false : true}
					onClick={() => {
						if (exist) {
							windowClick();
						} else {
							window.open("https://windowai.io/", "_blank");
						}
					}}
					className={cn(
						"text-[24px] leading-[100%] w-full",
						theme === "blue" ? "text-primary" : "text-primary-revert",
						"duration-500 py-4 px-4 uppercase",
						active === "MINT BRAINPRINT"
							? `hover:bg-[#DDF3FF] hover:text-black ${
									theme === "blue"
										? "bg-secondary shadow-[0px_0px_4px_0px_#8BD5FF,0px_0px_16px_0px_#0047FF]"
										: "bg-secondary-revert shadow-[0px_0px_4px_0px_#36A834,0px_0px_16px_0px_#5BCF24]"
							  }`
							: "bg-[#242D51]"
					)}
				>
					{exist ? "window ai" : "go to window ai"}
				</button>
				<button
					onClick={sendFree}
					className={cn(
						"text-[24px] leading-[100%] w-full",
						theme === "blue" ? "text-primary" : "text-primary-revert",
						"duration-500 py-4 px-4 uppercase",
						active === "MINT BRAINPRINT"
							? `hover:bg-[#DDF3FF] hover:text-black ${
									theme === "blue"
										? "bg-secondary shadow-[0px_0px_4px_0px_#8BD5FF,0px_0px_16px_0px_#0047FF]"
										: "bg-secondary-revert shadow-[0px_0px_4px_0px_#36A834,0px_0px_16px_0px_#5BCF24]"
							  }`
							: "bg-[#242D51]"
					)}
				>
					Totally free
				</button>
			</div>
			<div className="md:flex-row gap-[30px] lg:gap-[60px]">
				<img
					className="w-[200px] lg:w-[260px] h-[120px]"
					src={images.transparentBrain}
					alt=""
				/>
				<img
					className="w-20 h-20 md:w-[60px] lg:w-[70px] md:h-[60px] m-auto"
					src={images.transparentBall}
					alt=""
				/>
			</div>
		</div>
	);
}
