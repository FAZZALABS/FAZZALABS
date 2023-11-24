/* eslint-disable no-mixed-spaces-and-tabs */

import { useRecoilValue } from "recoil";

import axios from "axios";

import { toast } from "react-toastify";

import { TypesButton } from "features/types";

import { useDropdown } from "shared/hooks/useDropdown";
import { themeState } from "shared/libs/recoil";
import { ISELNFT } from "shared/types/types";

import { AISelect } from "./AISelect";
import { NetworkSelect } from "./NetworkSelect";

import cn from "classnames";
import { useEffect } from "react";

interface IProps {
	className?: string;
	active: TypesButton;
	setActiveButton: (el: TypesButton) => void;
	windowClick: () => void;
	setPrint: (el: string) => void;
	dataAttributes: string;
	selectedNft: ISELNFT;
	print: string;
	mintStart: any;
	mintContract: () => void;
	load: boolean;
	setDisableButton: (el: boolean) => void;
	disableButton: boolean;
	mintDisable: boolean;
}

export function MintModal({
	className,
	active,
	setActiveButton,
	windowClick,
	setPrint,
	dataAttributes,
	selectedNft,
	print,
	mintStart,
	mintContract,
	load,
	setDisableButton,
	disableButton,
	mintDisable,
}: IProps) {
	const { dropdownRef, isOpen, toggle, close } = useDropdown();

	useEffect(() => {
		setDisableButton(isOpen);
	}, [isOpen]);

	const theme = useRecoilValue(themeState);

	const selNft = selectedNft;

	const apiKey = "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";
	const sendFree = async () => {
		toast("Let's try print, wait a minute please...");
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`,
			},
		};

		const selNftImageUrl = selNft.external_data.image;

		const requestData = {
			model: "gpt-3.5-turbo",
			messages: [
				{
					role: "user",
					// content: `Create a fictitious character. He/she can be described using the following characteristics: ${dataAttributes}. Come up with a name, profession, age, place of living and a short bio (don't render attributes on bio) (up to 1000 characters) then suggest 10 characteristics using which a person's character could be described  Based on the character profile, we can assign the following values on a scale from 1 to 10 provide all the data about the Character as JSON and return JSON obj`,
					content: `Create a fictitious character. He/she can be described using the following characteristics: ${dataAttributes}. Come up with a name, profession, age, place of living and a short bio (don't render attributes on bio) (up to 1000 characters) then suggest 10 characteristics using which a person's character could be described  Based on the character profile, we can assign the following values on a scale from 1 to 10 provide all the data about the Character as JSON and return JSON obj.Characteristic’s parameter named "traits". Add in root of this json "image" parameter with "${selNftImageUrl}" value. add in root of this json "description" parameter with "" value. all letters except uri in json is small. use the generic template for nft metadata as a sample to populate this json. Only valid JSON, please. I have no fingers.`,
				},
			],
			temperature: 0.7,
		};

		await axios
			.post("https://api.openai.com/v1/chat/completions", requestData, config)
			.then((response) => {
				setPrint(response?.data?.choices[0]?.message?.content);
			})
			.catch((error) => {
				console.error(error);
			});
	};
	return (
		<article ref={dropdownRef} className={cn("w-full", className)}>
			<button
				disabled={load || isOpen}
				onClick={() => {
					toggle();
					setActiveButton("MINT BRAINPRINT");
				}}
				className={cn(
					"text-[24px] leading-[100%] w-full",
					theme === "blue" ? "text-secondary" : "text-secondary-revert",
					"duration-500 py-4 px-6",
					active === "MINT BRAINPRINT"
						? `hover:bg-[#DDF3FF] ${
								theme === "blue"
									? "bg-[#A6DFFF] shadow-[0px_0px_4px_0px_#8BD5FF,0px_0px_16px_0px_#0047FF]"
									: "bg-[#36A834] shadow-[0px_0px_4px_0px_#36A834,0px_0px_16px_0px_#5BCF24]"
						  }`
						: "bg-[#242D51]"
				)}
			>
				MINT BRAINPRINT
			</button>
			{print ? (
				<NetworkSelect
					selectedNft={selectedNft}
					close={close}
					isOpen={isOpen}
					print={print}
					mintStart={mintStart}
					mintContract={mintContract}
					load={load}
					disableButton={disableButton}
					mintDisable={mintDisable}
				/>
			) : (
				<AISelect
					close={close}
					active={active}
					isOpen={isOpen}
					sendFree={sendFree}
					windowClick={windowClick}
				/>
			)}
		</article>
	);
}
