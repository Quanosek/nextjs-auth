import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import { auth } from "@/lib/auth";
import Provider from "@/components/wrappers/provider";
import AccountButton from "@/components/header/accountButton";
import HamburgerMenu from "@/components/header/hamburgerMenu";

import "@/styles/globals.scss";
import "the-new-css-reset/css/reset.css";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "nextjs-auth",
  description: "Next.js Database Authentication with Auth.js and Prisma",
  icons: "/favicon.ico",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="pl">
      <body className={inter.className}>
        <Provider>
          <header>
            <Link href="/" className="title">
              <Image
                src="/icons/hash.svg"
                alt=""
                width={35}
                height={35}
                style={{ marginRight: "6px" }}
                draggable={false}
                priority
              />
              <h1>nextjs-auth</h1>
            </Link>

            <div className="desktopLinks">
              <Link href="/">
                <p>Strona główna</p>
              </Link>

              <Link href="/blog">
                <p>Blog</p>
              </Link>

              <AccountButton user={session?.user} />
            </div>

            <HamburgerMenu user={session?.user} />
          </header>

          {children}

          <footer>
            <p>
              Stworzone z 🩷 przez{" "}
              <Link href="https://github.com/Quanosek">Jakuba Kłało</Link>{" "}
              &#169; 2024
            </p>
          </footer>
        </Provider>

        <Toaster
          containerStyle={{ top: "calc(3.5rem / 2)" }}
          toastOptions={{
            style: {
              background: "#232323",
              color: "#ededed",
            },
            iconTheme: {
              primary: "#ededed",
              secondary: "#232323",
            },
          }}
        />
      </body>
    </html>
  );
}
