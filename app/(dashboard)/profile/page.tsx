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
        <p>ID: {user.id}</p>
        <p>Username: @{user.username}</p>
      </div>

      {/* <div className={styles.changePassword}>
        <h2>Zmiana hasła</h2>
        <ChangePassword />
      </div> */}

      <OperationButtons id={user?.id} />
    </main>
  );
}
