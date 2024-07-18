"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";

export default function SessionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
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

  return <SessionProvider>{children}</SessionProvider>;
}
