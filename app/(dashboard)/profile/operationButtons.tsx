"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

import styles from "@/styles/dashboard.module.scss";

export default function OperationButtonsComponent(params: {
  username: string;
}) {
  const router = useRouter();

  const logoutHandler = async () => {
    if (!confirm("Czy na pewno chcesz się wylogować?")) return;

    await signOut({ redirect: false });
    toast.success("Zostałeś pomyślnie wylogowany");
    router.push("/login");
    router.refresh();
  };

  const deleteHandler = async () => {
    if (!confirm("Czy na pewno chcesz usunąć swoje konto?")) return;

    try {
      const response = await fetch("/api/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: params.username }),
      });

      if (response.ok) {
        await signOut({ redirect: false });
        toast.success("Twoje konto zostało pomyślnie usunięte");
        router.push("/");
        router.refresh();
      } else {
        const error = await response.json();
        toast.error(error.message);
      }
    } catch (error) {
      toast.error("Wystąpił nieoczekiwany błąd, spróbuj ponownie");
      console.error(error);
    }
  };

  return (
    <div className={styles.operationButtons}>
      <button onClick={logoutHandler}>
        <p>Wyloguj się</p>
      </button>

      <button className={styles.redButton} onClick={deleteHandler}>
        <p>Usuń konto</p>
      </button>
    </div>
  );
}
