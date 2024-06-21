import type { Metadata } from "next";
import { ReactNode } from "react";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

import Header from "@/components/header";

import "@/styles/globals.scss";
import "the-new-css-reset/css/reset.css";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "nextjs-auth",
  description: "Next.js Database Authentication with Auth.js and Prisma",
  icons: "/favicon.ico",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pl">
      <body className={inter.className}>
        <Header />

        <SessionProvider>{children}</SessionProvider>

        <Toaster />
      </body>
    </html>
  );
}
