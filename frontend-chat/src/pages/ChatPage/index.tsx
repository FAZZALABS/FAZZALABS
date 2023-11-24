/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "shared/ui";
import { images } from "shared/assets";

import cn from "classnames";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { nameState, nftState } from "shared/libs/recoil";

export function ChatPage({ className }: { className?: string }) {
	const queryParameters = new URLSearchParams(window.location.search);
	const img = queryParameters.get("img");
	const queryName = queryParameters.get("name");
	const bioObj = queryParameters.get("bio");

	bioObj && console.log("bioObj: ", bioObj);
	// resultString && console.log("resultString: ", resultString);
	const [request, setRequest] = useState("");
	const [ask, setAsk] = useState(false);
	const [conv, setConv] = useState<{ role: "user" | "ai"; message: string }[]>(
		[]
	);
	const nfts = useRecoilValue(nftState);
	const name = useRecoilValue(nameState);

	const callWindowAI = async () => {
		console.log(
			`Start with joke. Your characteristics: ${bioObj}, you always try to joke, behave yourself sarcastically, but you also offer help`
		);
		setRequest("");
		setAsk(false);
		const [{ message }] = await (window as any).ai.generateText(
			{
				messages: [
					{
						role: "system",
						content: `Start answer with joke. Try to joke encouragingly at the expense of the interlocutor jokes have no boundaries, they can be vulgar and stupid , you can call me something funny. Based on your characteristics: ${bioObj}, you always try to joke, behave yourself sarcastically, but you also offer help`,
						// content: `First show code. start answer with code. Try to joke encouragingly at the expense of the interlocutor, jokes have no boundaries, they can be vulgar and stupid , you can call me something funny. communicate as if you were a man with the taste characteristics: ${r}.During the answer you can joke call me a fool or in some other way, you can go, while encouraging and giving an answer. `,
					},
					{
						role: "user",
						content: request,
					},
				],
			},
			{
				// temperature: 0.7,
				// maxTokens: 800,
				model: "openai/gpt-4",
				// Handle partial results if they can be streamed in
				onStreamResult: (res: any) => {
					console.log(res.message.content);
					// setResponse((prev) => prev.concat(res.message.content));
				},
			}
		);
		setConv((el) => [...el, { role: "ai", message: message.content }]);
		console.log("Full ChatML response: ", message);
	};
	if (ask) {
		callWindowAI();
	}
	function splitCodeAndText(message: string) {
		const codePattern = /(```[a-z]*\n[\s\S]*?\n```)|(`[^`]*`)/i;
		const parts = message.split(codePattern);
		return parts.map((part: string, index: number) => {
			if (codePattern.test(part)) {
				// Code part, wrap in a SyntaxHighlighter component with appropriate language style
				return (
					<SyntaxHighlighter
						key={index}
						language="jsx" // Set the appropriate language for syntax highlighting
						style={vscDarkPlus} // Use your preferred code highlighting style
						className="rounded-md p-2 max-w-[350px] overflow-x-scroll scrollbar scrollbar-thumb-[#f7dda5]"
					>
						{part}
					</SyntaxHighlighter>
				);
			} else {
				// Non-code part, wrap in a <p> element without a background
				return <p key={index}>{part}</p>;
			}
		});
	}
	return (
		<div
			className={cn(
				className,
				"flex flex-col items-end px-4 sm:pl-0 sm:pr-10 h-full min-h-screen w-screen",
				"py-5 sm:py-10 text-primary relative min-h-screen" // bg-secondary
			)}
		>
			<img
				className="absolute z-[-1] w-auto h-[90vh] top-[5vh] left-[5vw] rounded-[10px] hidden sm:block"
				src={images.bar}
				alt=""
			/>
			<img
				className="absolute z-[-2] w-screen h-full min-h-screen top-0 left-0"
				src={images.cosmolight}
				alt=""
			/>
			<div className="flex flex-col gap-4 flex-1 w-full sm:w-auto">
				<div className="flex flex-col md:flex-row flex-1 gap-2">
					<img
						className="w-[200px] h-[250px] rounded-[10px]"
						// src={getNormalizedImageUrl(nft.metadata.image)}
						src={img || nfts?.external_data.image}
						alt=""
					/>

					<div
						className={cn(
							className,
							"bg-white flex-1 rounded-[10px] flex flex-col gap-4 p-2 w-full md:w-[400px] text-black h-[530px]  overflow-y-scroll scrollbar scrollbar-thumb-primary"
						)}
					>
						{conv.map((conversation) => {
							if (conversation.role === "user") {
								return (
									<div className=" ml-auto flex flex-col gap-1 bg-blue-100 p-2 rounded w-fit text-right">
										<span className="text-xl font-bold">{name}</span>
										<span className="ml-4 text-justify">
											{conversation.message}
										</span>
									</div>
								);
							} else {
								const messageParts = splitCodeAndText(conversation.message);
								return (
									<div className="  bg-primary p-2 rounded w-fit">
										<p className="text-xl mb-1 font-bold">
											{queryName || nfts?.external_data.name}
										</p>
										{/* {messageParts && i === 1 && (
											<p>
												Oooooh is it traditional storage made you go bananas?
												Thats why you codemonkey love IPFS right ? 🍌Let’s
												freaking untangle that IPFS conundrum and you finally go
												have some beer you cheeky cheeky. <br /> Buckle up,
												because I'm about to take you on a wild ride through the
												land of code and IPFS! First, you need to install the
												IPFS API. Run this command in your terminal, but don't
												trip over your shoelaces while doing it: <br />
											</p>
										)} */}
										{messageParts}
									</div>
								);
							}
						})}
					</div>
				</div>
			</div>
			<div className="flex mt-10 gap-3 mx-auto sm:mx-0">
				<input
					placeholder="Request"
					className="bg-white w-[200px] sm:w-[260px] ml-auto text-black placeholder:text-black px-3"
					value={request}
					onChange={(el) => setRequest(el.target.value)}
					type="text"
				/>
				<Button
					className="text-black"
					disabled={request.length < 1}
					onClick={() => {
						setConv((el) => [...el, { role: "user", message: request }]);
						toast.success("Wait a bit for an answer!");
						setAsk(true);
					}}
				>
					send
				</Button>
			</div>
		</div>
	);
}
