"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";

// Fixed scroll-to-top on route change
const useScrollToTop = () => {
  useEffect(() => window.scrollTo(0, 0), [usePathname()]);
};

export default function SessionComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  useScrollToTop();

  return <SessionProvider>{children}</SessionProvider>;
}
