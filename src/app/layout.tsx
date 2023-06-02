"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { analytics } from "./analytics";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "RecplusAI",
	description: "Simplifying commendations using A.I",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	useEffect(() => {
		analytics(window, document, "script", "dataLayer", "G-GMPFRNH8JJ");
	});
	return (
		<html lang="en">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
