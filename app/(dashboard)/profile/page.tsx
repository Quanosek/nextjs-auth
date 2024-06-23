import { auth } from "@/lib/auth";
import ModifyPassword from "./modifyPassword";
import ActionButtons from "./actionButtons";

import styles from "@/styles/dashboard.module.scss";

export default async function ProfilePage() {
  const session = await auth();
  const user = session?.user as { id: string; username: string };

  return (
    <main className={styles.profile}>
      <h1>Twoje konto</h1>

      <div className={styles.userData}>
        <p>ID: {user.id}</p>
        <p>Username: @{user.username}</p>
      </div>

      {/* <div className={styles.changePassword}>
        <h2>Zmiana hasła</h2>
        <ModifyPassword />
      </div> */}

      <ActionButtons id={user?.id} />
    </main>
  );
}
