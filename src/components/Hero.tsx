import { useEffect, useState } from "react";
import style from "../styles/Hero.module.css";
import Typewriter from "./Typewriter";
import { Button } from "@nextui-org/react";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";

import { Selection } from "@/app/page";

type HeroProps = {
	mode: Selection;
	setMode: React.Dispatch<React.SetStateAction<Selection>>;
	handleModeChange: () => void;
};

function Hero(props: HeroProps) {
	const dataText = "Re:cplus.AI";
	console.log([...props.mode][0]);

	return (
		<div className={style.hero}>
			<div>
				<Typewriter
					text={dataText}
					delay={100}
					className={style["hero-header"]}
				/>
				<Typewriter
					text={"Simplifying commendations using A.I."}
					delay={50}
					className={style["sub-header"]}
				/>
				<div className="flex items-center mt-2">
					{![...props.mode][0] && (
						<Button
							ghost
							color="success"
							onClick={() =>
								props.setMode(new Set(["LinkedIn recommendation"]))
							}
						>
							<p>Get Started </p>
							<ArrowRightCircleIcon className="h-6 w-6 ml-2"></ArrowRightCircleIcon>
						</Button>
					)}
				</div>
			</div>
		</div>
	);
}

export default Hero;
