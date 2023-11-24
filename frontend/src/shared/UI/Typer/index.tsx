import { useState, useEffect } from "react";
import cn from "classnames";
import { useRecoilValue } from "recoil";
import { themeState } from "shared/libs/recoil";

export function TextTyper({
	text = "",
	interval = 100,
	rewriteInterval = 10000, // New prop for setting the rewrite interval
	Markup = "span" as keyof JSX.IntrinsicElements,
}) {
	const theme = useRecoilValue(themeState);
	const [typedText, setTypedText] = useState("");

	useEffect(() => {
		let typingTimer: any;
		let rewriteTimer: any;

		const typingRender = (text: string, updater: any, interval: number) => {
			let localTypingIndex = 0;
			let localTyping = "";

			if (text) {
				typingTimer = setInterval(() => {
					if (localTypingIndex < text.length) {
						updater((localTyping += text[localTypingIndex]));
						localTypingIndex += 1;
					} else {
						clearInterval(typingTimer);
						startRewrite();
					}
				}, interval);
			}
		};

		const startRewrite = () => {
			rewriteTimer = setTimeout(() => {
				setTypedText("");
				typingRender(text, setTypedText, interval);
			}, rewriteInterval);
		};

		typingRender(text, setTypedText, interval);

		return () => {
			clearInterval(typingTimer);
			clearTimeout(rewriteTimer);
		};
	}, [text, interval, rewriteInterval]);

	return (
		<Markup
			className={cn(
				theme === "blue"
					? "textShadow text-primary"
					: "textShadow-revert text-primary-revert"
			)}
		>
			{typedText}
		</Markup>
	);
}

export function PrinText({
	text,
	cursor,
	className,
}: {
	text: string;
	cursor?: string;
	className?: string;
}) {
	const theme = useRecoilValue(themeState);
	return (
		<p
			className={cn(
				"text-base lg:text-xl 3xl:text-[24px] leading-[90%] align-middle",
				theme === "blue"
					? "textShadow text-primary"
					: "textShadow-revert text-primary-revert",
				className
			)}
		>
			<TextTyper
				text={text}
				interval={70}
				rewriteInterval={10000}
				Markup={"code"}
			/>
			<span className={cn(theme === "blue" ? "cursor" : "cursor-revert")}>
				{cursor ? cursor : "_"}
			</span>
		</p>
	);
}
