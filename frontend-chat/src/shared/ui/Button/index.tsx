import cn from "classnames";

interface Iprops {
	className?: string;
	disabled?: boolean;
	onClick?: () => void;
	children: string;
}

export function Button({
	className,
	children,
	onClick,
	disabled = false,
}: Iprops) {
	return (
		<button
			disabled={disabled}
			className={cn(
				"w-full text-[24px] leading-[100%]",
				"duration-500 py-4 px-5 sm:px-10",
				"bg-primary shadow-xl",
				!disabled && "shadow-[#DECF90]",
				className
			)}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
