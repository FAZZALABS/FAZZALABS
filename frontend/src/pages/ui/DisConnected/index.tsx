import { useRecoilValue } from "recoil";

import { Connect } from "entites/ui/Connect";

import { TItle } from "shared/UI/Icons/TitleIcon";
import { PrinText } from "shared/UI/Typer";
import { themeState } from "shared/libs/recoil";

import cn from "classnames";

interface IProps {
	className?: string;
}

export function DisConnected({ className }: IProps) {
	const theme = useRecoilValue(themeState);

	return (
		<article
			className={cn(
				"flex-1 flex flex-col items-center justify-center",
				"gap-2 px-[13px] sm:px-0 pb-3 sm:pb-0 relative",
				className
			)}
		>
			<span
				className={cn(
					"absolute bottom-0 left-0 h-full w-[1px]",
					theme === "blue"
						? "bg-primary boxShadow"
						: "bg-primary-revert boxShadow-revert"
				)}
			></span>
			<span
				className={cn(
					"absolute bottom-0 right-0 h-full w-[1px]",
					theme === "blue"
						? "bg-primary boxShadow"
						: "bg-primary-revert boxShadow-revert"
				)}
			></span>
			<TItle />
			<PrinText
				className="text-center w-[67vw] sm:w-auto mx-auto"
				text="We connect graduated avatars with community, for the good of each other"
			/>
			<Connect className="w-full block sm:hidden mt-[100px]" />
		</article>
	);
}
