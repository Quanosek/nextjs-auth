import { auth, signOut } from "@/lib/auth";
// import ModifyPassword from "@/components/forms/modifyPassword";

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

  // const deleteAction = async () => {
  //   "use server";
  //   const response = await fetch("/api/deleteUser", {
  //     method: "DELETE",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ id: user.id }),
  //   });

  //   // const data = await response.json();
  //   // if (response.ok) {
  //   //   console.log("User deleted:", data);
  //   // } else {
  //   //   console.error("Error:", data);
  //   // }
  // };

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

      <div className={styles.operationButtons}>
        <form action={logoutAction}>
          <button>Wyloguj się</button>
        </form>

        {/* <form action={deleteAction}>
          <button className={styles.redButton}>Usuń konto</button>
        </form> */}
      </div>
    </main>
  );
}
