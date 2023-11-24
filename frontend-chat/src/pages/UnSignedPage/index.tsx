import { useEffect, useState } from "react";

import { useConnect } from "wagmi";

import { Tilt } from "react-tilt";

import { connectorMetamask } from "app/config/blockchain";

import { Button } from "shared/ui";
import { PrinText } from "shared/ui/Typer";
import { images } from "shared/assets";

import cn from "classnames";
import { useRecoilState } from "recoil";
import { nameState } from "shared/libs/recoil";

export function UnSignedPage({ className }: { className?: string }) {
	const { connect } = useConnect();

	const [name, setName] = useRecoilState(nameState);
	const [defName, setDefName] = useState("");
	const queryParameters = new URLSearchParams(window.location.search);
	const queryName = queryParameters.get("name");
	useEffect(() => {
		queryName && setName("User");
	}, [queryName]);
	const defaultOptions = {
		reverse: false, // reverse the tilt direction
		max: 5, // max tilt rotation (degrees)
		perspective: 100, // Transform perspective, the lower the more extreme the tilt gets.
		scale: 1.01, // 2 = 200%, 1.5 = 150%, etc..
		speed: 1000, // Speed of the enter/exit transition
		transition: true, // Set a transition on enter/exit.
		axis: null, // What axis should be disabled. Can be X or Y.
		reset: true, // If the tilt effect has to be reset on exit.
		easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
	};

	return (
		<div
			className={cn(
				className,
				"h-screen w-screen overflow-hidden flex flex-col py-10 px-20 realtive bg-black"

				// "bg-secondary h-screen w-screen text-primary"
			)}
		>
			<img
				className="absolute w-screen h-screen top-0 left-0 scale-y-[-1]"
				src={images.fcosmos}
				alt=""
			/>
			<div className="flex flex-1">
				<Tilt
					options={defaultOptions}
					className={cn(
						"flex flex-col justify-between flex-1 relative top-5 -left-10",
						"w-[60vw] relative overflow-hidden h-auto p-5"
					)}
				>
					<img
						className="absolute  w-full h-full top-0 left-0 scale-[1.55]"
						src={images.preview}
						alt=""
					/>
				</Tilt>
				<div className="w-fit flex flex-col ml-auto gap-4 relative">
					<input
						value={defName}
						onChange={(el) => {
							setDefName(el.target.value);
						}}
						placeholder="Your name"
						className={cn(
							"p-3 w-full h-[60px] bg-transparent",
							"border-[2px] text-primary placeholder:text-primary border-primary"
						)}
						type="text"
					/>
					<Button
						disabled={defName ? false : true}
						className="h-fit ml-auto"
						onClick={() => {
							setName(defName);
							connect({ connector: connectorMetamask });
							localStorage.setItem("name", name);
						}}
					>
						connect
					</Button>
				</div>
			</div>
			<PrinText
				className={cn(
					"text-[50px] font-bold text-center text-primary",
					"ml-auto my-auto relative top-[-80px]"
				)}
				text="Let's start your chat "
			/>
		</div>
	);
}
