"use client";

import Link from "next/link";

export default function LoginButtonComponent({ user }: any) {
  if (user) {
    return (
      <Link href="/profile">
        <p>Twoje konto</p>
      </Link>
    );
  } else {
    return (
      <Link href="/login" onClick={() => localStorage.clear()}>
        <p>Zaloguj się</p>
      </Link>
    );
  }
}
