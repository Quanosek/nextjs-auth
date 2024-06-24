"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import axios from "axios";

import styles from "@/styles/dashboard.module.scss";

export default function OperationButtonsComponent(param: { username: string }) {
  const username = param.username;
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

    const response = await axios.delete("/api/user", {
      data: JSON.stringify({ username }),
    });

    if (response.status === 200) {
      await signOut({ redirect: false });
      toast.success("Twoje konto zostało pomyślnie usunięte");
      router.push("/");
      router.refresh();
    } else {
      toast.error(response.data.message);
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
