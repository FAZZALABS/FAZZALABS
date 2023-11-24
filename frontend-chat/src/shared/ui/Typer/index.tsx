import { useState, useEffect } from "react";
import cn from "classnames";

export function TextTyper({
	text = "",
	interval = 100,
	rewriteInterval = 10000, // New prop for setting the rewrite interval
	Markup = "span" as keyof JSX.IntrinsicElements,
}) {
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

	return <Markup className="textShadow">{typedText}</Markup>;
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
	return (
		<p className={cn(className)}>
			<TextTyper
				text={text}
				interval={70}
				rewriteInterval={10000}
				Markup={"code"}
			/>
			<span className={cn("cursor-revert")}>{cursor ? cursor : "_"}</span>
		</p>
	);
}
