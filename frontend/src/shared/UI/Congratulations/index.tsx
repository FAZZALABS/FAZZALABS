import cn from "classnames";
// import { useRecoilValue } from "recoil";

import { useDropdown } from "shared/hooks/useDropdown";
// import { themeState } from "shared/libs/recoil";

interface IProps {
	className?: string;
}

export function Congratulations({ className }: IProps) {
	const { dropdownRef, toggle } = useDropdown();

	// const theme = useRecoilValue(themeState);
	return (
		<article ref={dropdownRef} className={cn("fixed z-[2000000]")}>
			<div
				className={cn("", className)}
				onClick={() => {
					toggle();
				}}
			></div>
			{/* <div
				className={cn(
					"fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
					"w-[340px] sm:w-[500px] h-[200px] border-2 rounded-[30px]",
					"gap-4 items-center z-[2000000]",
					theme === "blue"
						? "bg-secondary shadow-[0px_0px_4px_0px_#8BD5FF,0px_0px_16px_0px_#0047FF] border-2 border-primary text-primary"
						: "bg-secondary-revert shadow-[0px_0px_4px_0px_#36A834,0px_0px_16px_0px_#5BCF24] border-primary-revert text-primary-revert",
					isOpen
						? "opacity-[1] scale-y-[1] top-0 pt-[45px] sm:pt-[62px] 3xl:pt-[70px]"
						: "opacity-[1] scale-y-[1] top-0 pt-[45px] sm:pt-[62px] 3xl:pt-[70px]" // "opacity-[0] scale-y-[0] -top-[120px]"
				)}
			>
				<h2 className="text-2xl sm:text-3xl">Congratulations!</h2>
				<p className="text-base sm:text-lg">You minted Brainprint!</p>
			</div> */}
		</article>
	);
}
