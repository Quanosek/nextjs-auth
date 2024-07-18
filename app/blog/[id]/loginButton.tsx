"use client";

import Link from "next/link";

export default function LoginButtonComponent({ postId }: { postId: string }) {
  return (
    <Link
      href="/login"
      className="button blue"
      onClick={() => localStorage.setItem("redirect", `/blog/${postId}`)}
    >
      <p>Zaloguj się, aby dodać komentarz</p>
    </Link>
  );
}
