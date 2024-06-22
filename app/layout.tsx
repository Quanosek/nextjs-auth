import type { Metadata } from "next";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

import Header from "@/components/header";
import Footer from "@/components/footer";

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
        <SessionProvider>
          <Header />
          <main>{children}</main>
          <Footer />

          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
