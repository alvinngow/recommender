"use client";
import React, { useRef, Key, useState, LegacyRef } from "react";
import { analytics } from "./analytics";
import { useEffect } from "react";

import { createTheme, NextUIProvider, useTheme } from "@nextui-org/react";
import {
	ThemeProvider as NextThemesProvider,
	useTheme as useNextTheme,
} from "next-themes";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import style from "../styles/Page.module.css";
import Recommender from "@/components/Recommender";
import Quotes from "@/components/Quotes";

export type Selection = "all" | Set<Key>;

export default function Home() {
	const lightTheme = createTheme({
		type: "light",
		theme: {},
	});

	const [mode, setMode] = useState<Selection>(new Set());
	const recRef = useRef<HTMLFormElement | null>(null);
	const quotesRef = useRef<HTMLFormElement | null>(null);

	function handleModeChange() {
		if ([...mode][0] == "LinkedIn recommendation") {
			recRef.current!.scrollIntoView({ behavior: "smooth" });
		} else if ([...mode][0] == "Quotes") {
			quotesRef.current!.scrollIntoView({ behavior: "smooth" });
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
					{/* <NavBar></NavBar> */}
					<main className="lg:grid min-h-screen grid-cols-2 items-center ">
						<Hero
							mode={mode}
							setMode={setMode}
							handleModeChange={handleModeChange}
						></Hero>
						{[...mode][0] && (
							<div className="flex items-center justify-center w-full h-screen py-4">
								{[...mode!][0] == "LinkedIn recommendation" ? (
									<Recommender ref={recRef}></Recommender>
								) : (
									[...mode!][0] == "Quotes" && <Quotes ref={quotesRef}></Quotes>
								)}
							</div>
						)}
					</main>
				</div>
			</NextUIProvider>
		</NextThemesProvider>
	);
}
