import Head from "next/head";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "RecplusAI",
  description: "Simplifying commendations using A.I",
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="canonical" href="https://recplus.ai" key="canonical" />
        <link rel="icon" href="/favicon.png" sizes="any" />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
