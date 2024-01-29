// Core
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from 'next/head';

// Style
import "./style.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name='viewport' content='width=device-width; initial-scale=1.0'/>
      </Head>
      <body className={inter.className}>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
