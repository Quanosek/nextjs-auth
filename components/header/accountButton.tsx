"use client";

import Link from "next/link";

export default function HeaderComponent(params: { user: any }) {
  const { user } = params;

  if (user) {
    return (
      <Link href="/profile">
        <p>Twoje konto</p>
      </Link>
    );
  } else {
    return (
      <Link href="/login">
        <p>Zaloguj się</p>
      </Link>
    );
  }
}
