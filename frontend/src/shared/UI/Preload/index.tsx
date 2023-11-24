import { useRecoilValue } from "recoil";

import { themeState } from "shared/libs/recoil";
import { images } from "shared/assets";

import { PrintIcon } from "../Icons";

import cn from "classnames";
interface IProps {
	title: string;
	className?: string;
	image?: string;
	load?: boolean;
}

export function Preload({ title, className, image, load = false }: IProps) {
	const theme = useRecoilValue(themeState);
	return (
		<>
			<span
				className={cn(
					"leading-[100%] text-xl 3xl:text-[24px]",
					theme === "blue"
						? "text-primary textShadow"
						: "text-primary-revert textShadow-revert",
					className
				)}
			>
				{title}
			</span>
			{image ? (
				<img
					className="mt-auto mb-3 cursor-default h-[250px] w-[280px] 3xl:h-[338] 3xl:w-[370px]"
					src={image}
					alt=""
				/>
			) : !load ? (
				<PrintIcon className="mt-auto cursor-default h-[250px] w-[280px] 3xl:h-[338] 3xl:w-[370px]" />
			) : (
				<img
					className="m-auto w-10 sm:w-[150px] h-10 sm:h-[150px]"
					src={images.spinner}
					alt=""
				/>
			)}
		</>
	);
}
