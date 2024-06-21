import Link from "next/link";
import { auth } from "@/lib/auth";

export default async function HeaderComponent() {
  const session = await auth();
  const user = session?.user;

  return (
    <header>
      <h1>nextjs-auth</h1>

      <div>
        <Link href="/">Strona główna</Link>

        {!user ? (
          <Link href="/login">Zaloguj się</Link>
        ) : (
          <Link href="/profile">Twoje konto</Link>
        )}
      </div>
    </header>
  );
}
