import { useEffect, useState } from "react";
import style from "../styles/Hero.module.css";
import Typewriter from "./Typewriter";
import Image from "next/image";
import {
	createTheme,
	NextUIProvider,
	Input,
	useTheme,
	Switch,
	Dropdown,
	Textarea,
	Button,
	Loading,
} from "@nextui-org/react";

import { Selection } from "@/app/page";

type HeroProps = {
	mode: Selection | undefined;
	setMode: React.Dispatch<React.SetStateAction<Selection>>;
};

function Hero(props: HeroProps) {
	const dataText = "Re:cplus.AI";

	return (
		<div className={style.hero}>
			<div>
				<Typewriter
					text={dataText}
					delay={100}
					className={style["hero-header"]}
				/>
				<Typewriter
					text={"Simplifying commendations using A.I"}
					delay={100}
					className={style["sub-header"]}
				/>
				<div>
					<Dropdown>
						<Dropdown.Button light>
							{[...props.mode!][0] ? (
								props.mode
							) : (
								<p>Just tell us what you need</p>
							)}
						</Dropdown.Button>
						<Dropdown.Menu
							aria-label="Static Actions"
							variant="light"
							selectionMode="single"
							selectedKeys={props.mode}
							onSelectionChange={(e) => props.setMode(e)}
						>
							<Dropdown.Item key="LinkedIn recommendation">
								LinkedIn recommendation
							</Dropdown.Item>
							<Dropdown.Item key="Instagram captions">
								Instagram captions
							</Dropdown.Item>
							<Dropdown.Item key="Quotes">Quotes</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</div>
			</div>
		</div>
	);
}

export default Hero;
