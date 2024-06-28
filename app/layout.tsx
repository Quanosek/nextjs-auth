import type { Metadata } from "next";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import { auth } from "@/lib/auth";
import Provider from "@/components/wrappers/provider";
import AccountButton from "@/components/accountButton";

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
            <h1>nextjs-auth</h1>

            <div>
              <Link href="/">Strona główna</Link>
              <Link href="/blog">Blog</Link>
              <AccountButton user={session?.user} />
            </div>
          </header>

          {children}

          <footer>
            <p>
              Stworzone z 💙 przez{" "}
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
