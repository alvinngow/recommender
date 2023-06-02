"use client";
import React, { useRef, Key, useState } from "react";

import { createTheme, NextUIProvider, useTheme } from "@nextui-org/react";
import {
	ThemeProvider as NextThemesProvider,
	useTheme as useNextTheme,
} from "next-themes";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import style from "../styles/Page.module.css";
import Recommender from "@/components/Recommender";

export type Selection = "all" | Set<Key>;

export default function Home() {
	const lightTheme = createTheme({
		type: "light",
		theme: {},
	});

	const [mode, setMode] = useState<Selection | undefined>(undefined);

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
					<main className="grid min-h-screen grid-cols-2 items-center">
						<Hero mode={mode} setMode={setMode}></Hero>
						<Recommender></Recommender>
					</main>
				</div>
			</NextUIProvider>
		</NextThemesProvider>
	);
}
