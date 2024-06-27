import Link from "next/link";
import { auth } from "@/lib/auth";
import ChangePassword from "./changePassword";
import OperationButtons from "./operationButtons";

import styles from "@/styles/dashboard.module.scss";

export default async function ProfilePage() {
  const session = await auth();
  const user = session?.user as { id: string; username: string };

  return (
    <main className={styles.profile}>
      <h1>Twoje konto</h1>

      <div className={styles.userData}>
        <p>@{user?.username}</p>
        <p className={styles.userId}>ID: {user?.id}</p>
      </div>

      <section className={styles.blogSection}>
        <h2>Działania na blogu:</h2>

        <div className={styles.buttons}>
          <Link href="/blog/create" className="button">
            <p>Napisz nowy post</p>
          </Link>

          <Link href="/blog" className="button">
            <p>Otwórz listę wszystkich postów</p>
          </Link>
        </div>
      </section>

      <hr />

      <section className={styles.changePassword}>
        <h2>Zmień swoje hasło:</h2>
        <ChangePassword username={user?.username} />
      </section>

      <hr />

      <OperationButtons username={user?.username} />
    </main>
  );
}
