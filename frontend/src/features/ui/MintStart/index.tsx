/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect, useState } from "react";

import { ethers } from "ethers";

import { useSwitchNetwork } from "wagmi";

import { useRecoilValue } from "recoil";

import { toast } from "react-toastify";

import { TypesButton } from "features/types";

import { MintModal } from "entites/ui/MintModal";

import { CONTRACT_ADDRESS } from "../../../app/config/variables";

//import { images } from "shared/assets";
import { QrCode } from "shared/UI/Icons";
import { ISELNFT } from "shared/types/types";
import { themeState } from "shared/libs/recoil";
import { getNormalizedImageUrl } from "shared/utils";
import { usePostGetPrint, usePostSavePrint } from "shared/libs/query";

import cn from "classnames";

//import { copyObjectX } from "./utils";

interface IProps {
	selectedNft: ISELNFT;
	mintStart: any;
	setSelectedNft: (el: ISELNFT | null) => void;
	setMintStart: any;
	setFakeMint: (el: boolean) => void;
}

export function MintStart({
	selectedNft,
	setSelectedNft,
	setMintStart,
	mintStart,
	setFakeMint,
}: IProps) {
	const image =
		selectedNft?.external_data?.image ||
		selectedNft?.external_data?.image_256 ||
		selectedNft?.external_data?.image_512 ||
		selectedNft?.external_data?.image_1024;
	const [print, setPrint] = useState("");

	const theme = useRecoilValue(themeState);

	const [activeButton, setActiveButton] =
		useState<TypesButton>("MINT BRAINPRINT");

	const { postGetPrint } = usePostGetPrint();
	const { postSavePrint } = usePostSavePrint();
	const [conf, setConf] = useState<string | null>(null);
	const [load, setLoad] = useState(false);
	const [lastPrintHash, setLastPrintHash] = useState<any>("");
	const [mintDisable, setMintDisable] = useState(false);
	const [disableButton, setDisableButton] = useState(false);

//	const brainPrintChatBaseURL = "http://localhost:3001/";
	const brainPrintChatBaseURL = "http://brainprint.app/chat/";
	var redirectionUrl = brainPrintChatBaseURL

	if(!!print){
		var printObj = null;
		try
		{
			printObj = JSON.parse(print);
		}
		catch(exc){

		}
		if(!!printObj){
			// const brainPrintChatBaseURL = "https://brainprint.app/chat/"

			const brainPrintImageUrl = image;
			const brainPrintName = encodeURI(printObj.name);
			const brainPrintBio = encodeURI(printObj.bio);

			redirectionUrl = `${brainPrintChatBaseURL}?img=${brainPrintImageUrl}&name=${brainPrintName}&bio=${brainPrintBio}`;
		}
	}
	useEffect(() => {
		conf && setLoad(false);
		conf && setMintDisable(false);
		conf && window.open(redirectionUrl, "_blank");
	}, [conf]);

	const { isSuccess } = useSwitchNetwork();

	isSuccess && toast.success("Network switched, start Mint!");

	//const contractAddress = "0x718d507BDbE90064e93FA08F5a0F8bb99e5C3D05"; //TODO remove to env
	// const contractAddress = "0x7A713201cac32Fc45e5E8ab63A2E8B13ffc0297C"; // polygon mumbai
	const contractAddress = CONTRACT_ADDRESS.toString();
	
	const abi = new ethers.utils.Interface([
		//"function mint(string memory _external_url, string memory _image_url, string memory _description, string memory _nftName, string memory _data) public",
		"function mint(string memory ipfs, string memory data) public",
	
	]);
	const provider = new ethers.providers.Web3Provider((window as any).ethereum);
	const signer = provider.getSigner();
	const smartContract = new ethers.Contract(contractAddress, abi, signer);

	const mintContract = async () => {
		setMintDisable(true);
		setFakeMint(true);

		try {
			setLoad(true);
			setMintDisable(true);

			var nftMetadataUrl = `https://ipfs.io/ipfs/${lastPrintHash}`; // url pointing to metadata
			//var imageUrl = images.qrCode;
			//var nftName = selectedNft.external_data.name
			//var nftDescription = selectedNft.external_data.description;

			//var objectCopy = copyObjectX(selectedNft);
			//var nftData = JSON.stringify(objectCopy);
			var nftData = JSON.stringify(selectedNft);
			console.log(nftData);

			const contractResult = await smartContract.mint(
				nftMetadataUrl,
				nftData
			);
			setTimeout(() => {
				toast("In process, wait about a minute please");
			}, 1000);
			await contractResult.wait(3);
			const confirmedResult = await contractResult.wait(3);

			setConf(JSON.stringify(confirmedResult));
			conf && toast.success("Mint finished!");
			conf && setMintDisable(false);

			setLoad(false);
		} catch (error) {
			toast.error("Error with contract call");
			setLoad(false);
			setMintDisable(false);
			if ((error as any).message.includes("Condition not met")) {
				setMintDisable(false);
				setLoad(false);
			} else if (error instanceof Error) {
				setMintDisable(false);
				setLoad(false);
			} else {
				setMintDisable(false);
				setLoad(false);
			}
		}
	};
	const minPrint = async () => {
		const savePrint = await postSavePrint(
			selectedNft.contract_address,
			selectedNft?.token_id,
			print
		);
		savePrint && toast.success("Print Saved!");
		const received = await postGetPrint(
			selectedNft.contract_address,
			selectedNft?.token_id
		);
		if (received) {
			setLastPrintHash(received[0].ipfs);
		} else {
			toast.error("Something went wrong!");
		}
	};
	useEffect(() => {
		print && minPrint();
	}, [print]);

	const nftImageUrl = selectedNft?.external_data?.image;

	const dataAttributes = selectedNft?.external_data?.attributes
		.map((el) => {
			if (
				el.trait_type === undefined ||
				el.trait_type === "Background" ||
				el.value === undefined
			)
				return "";
			return `${el.trait_type}: ${el.value}`;
		})
		.join(", ");
	const createPrint = async () => {
		toast("Let's try print, wait a minute please...");

		const [{ message }] = await (window as any).ai.generateText(
			{
				messages: [
					{
						role: "user",
						// content: `Create a fictitious character. He/she can be described using the following characteristics: ${dataAttributes}. Come up with a name, profession, age, place of living and a short bio (don't render attributes on bio) (up to 1000 characters) then suggest 10 characteristics using which a person's character could be described  Based on the character profile, we can assign the following values on a scale from 1 to 10 provide all the data about the Character as JSON and return JSON obj`,
						content:  `Create a fictitious character. He/she can be described using the following characteristics: ${dataAttributes}. Come up with a name, profession, age, place of living and a short bio (don't render attributes on bio) (up to 1000 characters) then suggest 10 characteristics using which a person's character could be described  Based on the character profile, we can assign the following values on a scale from 1 to 10 provide all the data about the Character as JSON and return JSON obj.Characteristic’s parameter named "traits". Add in root of this json "image" parameter with "${nftImageUrl}" value. add in root of this json "description" parameter with "" value. all letters except uri in json is small. use the generic template for nft metadata as a sample to populate this json. Only valid JSON, please. I have no fingers.`,
					},
				],
			},
			{
				temperature: 0.7,
				maxTokens: 800,
			}
		);
		setPrint(message.content);
		print && toast("Print created!");
	};

	const isVideo = selectedNft?.external_data?.asset_file_extension == "mp4";

	return (
		<>
			<div
				className={cn(
					" pl-4 lg:pl-8 3xl:pl-12 pt-4 3xl:pt-12 pr-5 3xl:pr-8",
					"border-x-[1px] text-base lg:text-xl 3xl:text-[24px]",
					theme === "blue"
						? "text-primary textShadow border-primary boxShadow"
						: "text-primary-revert textShadow-revert border-primary-revert boxShadow-revert"
				)}
			>
				<span className="leading-[70%] mb-2 lg:mb-0">
					Graduate your NFT-friend
				</span>
				<span className="leading-[80%] hidden lg:block">
					___________________________
				</span>

				{!isVideo ? (
					<img
						className="max-w-full max-h-[285px] 3xl:max-h-max mx-auto xl:mx-0 lg:max-w-full"
						src={getNormalizedImageUrl(image)}
						alt=""
					/>
				) : (
					<video
						className="max-w-full max-h-[285px] 3xl:max-h-max mx-auto xl:mx-0 lg:max-w-full"
						controls
					>
						<source src={image} type="video/mp4" />
					</video>
				)}
				<button
					onClick={() => {
						setSelectedNft(null);
						setMintStart(null);
					}}
					className={cn(
						"text-[24px] leading-[100%] my-3 mx-auto lg:mx-0 w-[285px] lg:my-auto",
						"duration-500 py-4 px-6 lg:w-auto lg:max-w-full",
						theme === "blue"
							? "text-secondary bg-[#A6DFFF] shadow-[0px_0px_4px_0px_#8BD5FF,0px_0px_16px_0px_#0047FF]"
							: "text-secondary-revert bg-[#36A834] shadow-[0px_0px_4px_0px_#36A834,0px_0px_16px_0px_#5BCF24]"
					)}
				>
					Back again
				</button>
			</div>
			<div className="pb-5 lg:pb-0 sm:flex-row justify-center items-center gap-1 xl:gap-5 2xl:gap-10 3xl:gap-[50px]">
				<QrCode className="w-[320px] h-[320px] sm:w-[270px] sm:h-[270px] xl:w-[347px] xl:h-[347px]" />
				<div className="gap-5 3xl:gap-8">
					<MintModal
						mintStart={mintStart}
						selectedNft={selectedNft}
						setActiveButton={setActiveButton}
						active={activeButton}
						windowClick={createPrint}
						dataAttributes={dataAttributes}
						setPrint={setPrint}
						print={print}
						mintContract={mintContract}
						load={load}
						setDisableButton={setDisableButton}
						disableButton={disableButton}
						mintDisable={mintDisable}
					/>
					{TypesButton.map((button: TypesButton) => {
						if (button === "MINT BRAINPRINT") return;

						return (
							<button
								disabled={load || disableButton}
								key={button}
								onClick={() => {
									setActiveButton(button);
									// button === "SAVE PRINT" && minPrint();
								}}
								className={cn(
									"text-[24px] leading-[100%]",
									theme === "blue" ? "text-secondary" : "text-secondary-revert",
									"duration-500 py-4 px-6",

									button === activeButton
										? `hover:bg-[#DDF3FF] ${
												theme === "blue"
													? "bg-[#A6DFFF] shadow-[0px_0px_4px_0px_#8BD5FF,0px_0px_16px_0px_#0047FF]"
													: "bg-[#36A834] shadow-[0px_0px_4px_0px_#36A834,0px_0px_16px_0px_#5BCF24]"
										  }`
										: "bg-[#242D51]"
								)}
							>
								{button}
							</button>
						);
					})}
				</div>
			</div>
		</>
	);
}
