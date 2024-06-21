import Link from "next/link";
import { auth, signOut } from "@/lib/auth";

export default async function HeaderComponent() {
  const session = await auth();
  const user = session?.user;

  const logoutAction = async () => {
    "use server";
    await signOut();
  };

  return (
    <header>
      <h1>nextjs-auth</h1>

      <div>
        <Link href="/">Strona główna</Link>

        {!user && <Link href="/login">Zaloguj się</Link>}

        {user && (
          <>
            <Link href="/client">Klient</Link>
            <Link href="/profile">Twoje konto</Link>

            <form action={logoutAction}>
              <button>Wyloguj się</button>
            </form>
          </>
        )}
      </div>
    </header>
  );
}
