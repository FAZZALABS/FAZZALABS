import cn from "classnames";
import { useState } from "react";
// import { getNormalizedImageUrl } from "shared/hooks";
// import { INFT } from "shared/libs/query/types";

interface IAIPersonProps {
	// nft: INFT;
	className?: string;
	callRequest: boolean;
	request: string;
	setRequest: (el: string) => void;
	setAsk: (el: boolean) => void;
	setConv: (el: { role: "user" | "ai"; message: string }[]) => void;
	conv: { role: "user" | "ai"; message: string }[];
}

export function AIPerson({
	className,
	// nft,
	callRequest,
	request,
	setRequest,
	setAsk,
	// setConv,
	conv,
}: IAIPersonProps) {
	// const traits = nfts[0].metadata.attributes
	// 	.map((el) => {
	// 		if (el.trait_type === undefined || el.value === undefined) return "";
	// 		return `${el.trait_type}: ${el.value}`;
	// 	})
	// 	.join(", ");
	const [response, setResponse] = useState<string>("");

	const callWindowAI = async () => {
		setRequest("");
		setAsk(false);
		const [{ message }] = await (window as any).ai.generateText(
			{
				messages: [
					{
						role: "system",
						content: `
						behave like a wild macaque, which always try to joke encouragingly at the expense of the interlocutor, jokes have no boundaries, they can be vulgar and stupid , you can call me something funny. communicate as if you were a man with the taste characteristics: 01 Background: Plants, 02 Body: Zombie, 03 Clothing: Shirt, 04 Earrings: Triple_earrings, 05 Face: Happy Aborigine, 06 Headwear: Playboy. when answering, you can jokingly call me a fool or in some other way, and during the answer you can joke, you can go, while encouraging and giving an answer`,
					}, // before answering, make a joke about the question and me
					{
						role: "user",
						content: request,
					},
				],
			},
			{
				temperature: 0.7,
				maxTokens: 800,
				// model: modelAi,
				// Handle partial results if they can be streamed in
				onStreamResult: (res: any) => {
					console.log(res.message.content);
					setResponse((prev) => prev.concat(res.message.content));
				},
			}
		);
		// setConv((el: any) => [...el, { role: "ai", message: message. }]);
		console.log("Full ChatML response: ", message);
	};
	if (callRequest) {
		callWindowAI();
	}
	return (
		<div className="flex flex-row flex-1 gap-2">
			<img
				className="w-[200px] h-[250px] rounded-[10px]"
				// src={getNormalizedImageUrl(nft.metadata.image)}
				src="https://nftassets.covalenthq.com/6043685d6d1b08949e7688fa75b004c59e24ec7f7f781e6d80984f205ae2e0db.png"
				alt=""
			/>
			<div
				className={cn(
					className,
					"bg-white flex-1 rounded-[10px] flex flex-col gap-2 p-2 w-[400px]"
				)}
			>
				{conv.map((conversation) => {
					if (conversation.role === "user") {
						return (
							<div>
								<span>User</span>
								<textarea
									value={response}
									// className={cn(
									// 	"w-full h-full scrollbar scrollbar-thumb-primary",
									// 	"text-[16px] text-black placeholder:text-black font-bold",
									// 	"flex-1 backdrop-blur-[2px] p-5 "
									// )}
								>
									{conversation.message}
								</textarea>
							</div>
						);
					} else {
						return (
							<div>
								<span>BrainPrint#1234CreepyApe#2653</span>
								<textarea
									value={response}
									className={cn(
										"w-full h-full scrollbar scrollbar-thumb-primary",
										"text-[16px] text-black placeholder:text-black font-bold",
										"flex-1 backdrop-blur-[2px] p-5 "
									)}
								>
									{conversation.message}
								</textarea>
							</div>
						);
					}
				})}
			</div>
		</div>
	);
}
