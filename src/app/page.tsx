"use client";
import React, { useRef, Key, useState, useCallback } from "react";
import { analytics } from "./analytics";
import { useEffect } from "react";

import {
	createTheme,
	Dropdown,
	NextUIProvider,
	useTheme,
} from "@nextui-org/react";
import {
	ThemeProvider as NextThemesProvider,
	useTheme as useNextTheme,
} from "next-themes";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import style from "../styles/Page.module.css";
import Recommender from "@/components/Recommender";
import Quotes from "@/components/Quotes";
import Improvements from "@/components/Improvements";
import About from "@/components/About";
import PolygonMaker from "@/components/PolygonMaker";

export type Selection = "all" | Set<Key>;

export type SiteMode = "ai" | "about";

export default function Home() {
	const lightTheme = createTheme({
		type: "light",
		theme: {},
	});

	const [mode, setMode] = useState<Selection>(new Set());
	const [siteMode, setSiteMode] = useState<SiteMode>("ai");
	const recRef = useRef<HTMLFormElement | null>(null);
	const improvementsRef = useRef<HTMLFormElement | null>(null);
	const quotesRef = useRef<HTMLFormElement | null>(null);
	const dropDownRef = useRef<HTMLDivElement>(null);

	const [submitted, setSubmitted] = React.useState<boolean>(false);
	const [loading, setLoading] = React.useState<boolean>(false);

	function handleModeChange() {
		if ([...mode][0] == "LinkedIn recommendation") {
			recRef.current!.scrollIntoView({ behavior: "smooth" });
		} else if ([...mode][0] == "Suggest Improvements") {
			improvementsRef.current!.scrollIntoView({ behavior: "smooth" });
		} else if ([...mode][0] == "Quotes") {
			quotesRef.current!.scrollIntoView({ behavior: "smooth" });
		}
		if ([...mode][0]) {
			console.log(
				"🚀 ~ file: page.tsx:51 ~ handleModeChange ~ dropDownRef:",
				dropDownRef
			);
			dropDownRef.current!.scrollIntoView({ behavior: "smooth" });
		}
	}

	useEffect(() => {
		handleModeChange();
	}, [mode]);

	useEffect(() => {
		analytics(window, document, "script", "dataLayer", "G-GMPFRNH8JJ");
	});

	return (
		<NextThemesProvider
			defaultTheme="system"
			attribute="class"
			value={{
				dark: lightTheme.className,
			}}
		>
			<NextUIProvider>
				<div className={style.page}>
					<NavBar siteMode={siteMode} setSiteMode={setSiteMode}></NavBar>
					{siteMode == "ai" ? (
						<main className="lg:grid min-h-screen grid-cols-2 items-center ">
							<Hero
								mode={mode}
								setMode={setMode}
								handleModeChange={handleModeChange}
							></Hero>
							{[...mode][0] ? (
								<>
									<div
										className="flex flex-col items-center justify-center w-full min-h-screen py-4"
										style={{ backgroundImage: `url(/bg.png)` }}
										ref={dropDownRef}
									>
										<Dropdown>
											<Dropdown.Button className="ml-2" light>
												{[...mode!][0] ? (
													<p className="text-2xl">{mode}</p>
												) : (
													<p className="text-2xl">Select your need</p>
												)}
											</Dropdown.Button>
											<Dropdown.Menu
												aria-label="Static Actions"
												variant="flat"
												selectionMode="single"
												selectedKeys={mode}
												onSelectionChange={(e) => {
													setMode(e);
													setSubmitted(false);
													setLoading(false);
												}}
											>
												<Dropdown.Item
													className="mt-2"
													key="LinkedIn recommendation"
												>
													LinkedIn recommendation
												</Dropdown.Item>
												<Dropdown.Item
													className="my-2"
													key="Suggest improvements"
												>
													Suggest improvements
												</Dropdown.Item>
												{/* <Dropdown.Item key="Instagram captions">
														Instagram captions
													</Dropdown.Item> */}
												<Dropdown.Item key="Quotes">Quotes</Dropdown.Item>
											</Dropdown.Menu>
										</Dropdown>
										{[...mode!][0] == "LinkedIn recommendation" ? (
											<Recommender
												submitted={submitted}
												setSubmitted={setSubmitted}
												loading={loading}
												setLoading={setLoading}
												ref={recRef}
											></Recommender>
										) : [...mode!][0] == "Quotes" ? (
											<Quotes
												submitted={submitted}
												setSubmitted={setSubmitted}
												loading={loading}
												setLoading={setLoading}
												ref={quotesRef}
											></Quotes>
										) : (
											<Improvements
												submitted={submitted}
												setSubmitted={setSubmitted}
												loading={loading}
												setLoading={setLoading}
												ref={improvementsRef}
											></Improvements>
										)}
									</div>
								</>
							) : (
								<div
									className="lg:block lg:min-h-screen none"
									style={{ backgroundImage: `url(/bg.png)` }}
								></div>
							)}
						</main>
					) : (
						<About />
					)}
				</div>
			</NextUIProvider>
		</NextThemesProvider>
	);
}
