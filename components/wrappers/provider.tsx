"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";

const useScrollToTop = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const elemId = document.location.hash.slice(1);

    // scroll to element
    if (elemId) {
      const element = document.getElementById(elemId);
      element?.scrollIntoView();
    } else {
      // scroll to top of page
      window.scrollTo(0, 0);
    }
  }, [pathname]);
};

export default function SessionComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  useScrollToTop();

  return <SessionProvider>{children}</SessionProvider>;
}
