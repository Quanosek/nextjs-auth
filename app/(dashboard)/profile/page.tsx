import { auth, signOut } from "@/lib/auth";

import styles from "@/styles/dashboard.module.scss";

export default async function ProfilePage() {
  const session = await auth();
  const user = session?.user as { id: string; username: string };

  const logoutAction = async () => {
    "use server";
    await signOut({
      redirect: true,
      redirectTo: "/login",
    });
  };

  return (
    <main>
      <h1>Twoje konto</h1>

      <div className={styles.userData}>
        <p>ID: {user?.id}</p>
        <p>Username: {user?.username}</p>
      </div>

      <form action={logoutAction}>
        <button className={styles.redButton}>Wyloguj się</button>
      </form>
    </main>
  );
}
