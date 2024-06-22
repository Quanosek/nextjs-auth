import Link from "next/link";
import RegisterForm from "@/components/forms/register";

import styles from "@/styles/auth.module.scss";

export default function RegisterPage() {
  return (
    <>
      <h1>Stwórz konto</h1>

      <RegisterForm />

      <p className={styles.snipped}>
        Jeśli posiadasz już konto, <Link href="/login">zaloguj się!</Link>
      </p>
    </>
  );
}
