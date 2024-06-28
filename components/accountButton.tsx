"use client";

import Link from "next/link";

export default function HeaderComponent(params: { user: any }) {
  const { user } = params;

  if (user) {
    return <Link href="/profile">Twoje konto</Link>;
  } else {
    return <Link href="/login">Zaloguj się</Link>;
  }
}
