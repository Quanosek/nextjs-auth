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
        <p>ID: {user?.id}</p>
        <p>Username: @{user?.username}</p>
      </div>

      <div className={styles.blogActions}>
        <h2>Blog:</h2>

        <div className={styles.buttons}>
          <Link href="/blog/create">Stwórz nowy artykuł</Link>
          <Link href="/blog/list">Otwórz listę wszystkich artykułów</Link>
        </div>
      </div>

      <hr />

      <div className={styles.changePassword}>
        <h2>Zmiana hasła:</h2>
        <ChangePassword username={user?.username} />
      </div>

      <hr />

      <OperationButtons username={user?.username} />
    </main>
  );
}
