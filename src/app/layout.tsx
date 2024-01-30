// Core
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from 'next/head';

// Style
import "./style.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inventory Manager",
  description: "Manager your music gear business inventory",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
