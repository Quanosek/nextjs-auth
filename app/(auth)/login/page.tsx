import Link from "next/link";
import Form from "./form";

import styles from "@/styles/auth.module.scss";

export default function LoginPage() {
  return (
    <main>
      <h1>Zaloguj się</h1>

      <Form />

      <p className={styles.snipped}>
        Nie masz jeszcze konta? <Link href="/register">Zarejestruj się!</Link>
      </p>
    </main>
  );
}
