"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AccountButton from "./accountButton";

export default function HamburgerMenu(params: any) {
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    if (showNav) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [showNav]);

  return (
    <div className="hamburgerMenu">
      <input
        type="checkbox"
        id="hamburger"
        checked={showNav}
        onChange={() => setShowNav(!showNav)}
        style={{
          backgroundImage: showNav
            ? "url('/icons/close.svg')"
            : "url('/icons/menu.svg')",
        }}
      />

      <nav
        onClick={() => setTimeout(() => setShowNav(false), 100)}
        style={{ display: showNav ? "flex" : "none" }}
      >
        <Link href="/">
          <p>Strona główna</p>
        </Link>
        <Link href="/blog">
          <p>Blog</p>
        </Link>
        <AccountButton user={params.user} />
      </nav>
    </div>
  );
}
