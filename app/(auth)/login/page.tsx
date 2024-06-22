import Link from "next/link";
import { Suspense } from "react";
import LoginForm from "@/components/forms/login";

import styles from "@/styles/auth.module.scss";

export default function LoginPage() {
  return (
    <>
      <h1>Zaloguj się</h1>

      <Suspense fallback={<p>Ładowanie...</p>}>
        <LoginForm />

        <p className={styles.snipped}>
          Nie masz jeszcze konta? <Link href="/register">Zarejestruj się!</Link>
        </p>
      </Suspense>
    </>
  );
}
