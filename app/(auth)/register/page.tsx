import Link from "next/link";
import Form from "./form";

import styles from "@/styles/auth.module.scss";

export default function RegisterPage() {
  return (
    <main>
      <h1>Stwórz konto</h1>

      <Form />

      <p className={styles.snipped}>
        Jeśli posiadasz już konto, <Link href="/login">zaloguj się!</Link>
      </p>
    </main>
  );
}
