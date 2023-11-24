import { useAccount } from "wagmi";

import { images } from "shared/assets";

import cn from "classnames";
import { useMediaQuery } from "shared/hooks/useMediaQuery";
import { themeState } from "shared/libs/recoil";
import { useRecoilValue } from "recoil";
interface IProps {
	className?: string;
}

const brandImages = [
	images.brand_1,
	images.brand_2,
	images.brand_3,
	// images.brand_4,
	images.brand_5,
	images.brand_6,
	// images.brand_7,
	images.brand_8,
	images.brand_9,
];
const brandMobileImages = [
	images.brand_mobile_1,
	images.brand_mobile_2,
	images.brand_mobile_3,
	// images.brand_mobile_4,
	images.brand_mobile_5,
	images.brand_mobile_6,
	// images.brand_mobile_7,
	images.brand_mobile_8,
	images.brand_mobile_9,
];
export function Footer({ className }: IProps) {
	const isMobile = useMediaQuery("(max-width: 1200px)");
	const { address } = useAccount();
	const theme = useRecoilValue(themeState);
	return (
		<article
			className={cn(
				"w-full flex flex-col relative",
				"px-[13px] sm:px-6 3xl:px-12 pt-4 3xl:pt-8 pb-0 3xl:pb-[30px]",
				className
			)}
		>
			<span
				className={cn(
					"absolute h-[1px] top-0",
					address ? "right-0 w-[calc(100%)]" : "right-0 w-[calc(100%)]",
					theme === "blue"
						? "bg-primary boxShadow"
						: "bg-primary-revert boxShadow-revert"
				)}
			></span>
			<span
				className={cn(
					"absolute h-[1px] bottom-0",
					address ? "right-0 w-[calc(100%)]" : "right-0 w-[calc(100%)]",
					theme === "blue"
						? "bg-primary boxShadow"
						: "bg-primary-revert boxShadow-revert"
				)}
			></span>
			<span
				className={cn(
					"absolute h-[100%] bottom-0",
					address ? "left-0 w-[1px]" : "left-0 w-[1px]",
					theme === "blue"
						? "bg-primary boxShadow"
						: "bg-primary-revert boxShadow-revert"
				)}
			></span>
			<span
				className={cn(
					"absolute h-[100%] bottom-0",
					address ? "right-0 w-[1px]" : "right-0 w-[1px]",
					theme === "blue"
						? "bg-primary boxShadow"
						: "bg-primary-revert boxShadow-revert"
				)}
			></span>
			<span
				className={cn(
					"text-base sm:text-[24px] leading-[70%]",
					theme === "blue"
						? "text-primary textShadow"
						: "text-primary-revert textShadow-revert"
				)}
			>
				MOAT Powered By:
			</span>
			<div
				className={cn(
					"flex flex-wrap xl:flex-nowrap flex-row items-center justify-between",
					"mt-4 sm:mt-0 gap-y-6 pb-5 sm:pb-1"
				)}
			>
				{isMobile
					? brandMobileImages.map((imgUrl: string) => (
							<img key={imgUrl} src={imgUrl} alt="brand" />
					  ))
					: brandImages.map((imgUrl: string) => (
							<img key={imgUrl} src={imgUrl} alt="brand" />
					  ))}
			</div>
		</article>
	);
}
