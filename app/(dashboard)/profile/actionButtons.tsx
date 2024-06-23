"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import axios from "axios";

import styles from "@/styles/dashboard.module.scss";

export default function ActionButtonsComponent(param: { id: string }) {
  const id = param.id;
  const router = useRouter();

  const logoutHandler = async () => {
    if (!confirm("Czy na pewno chcesz się wylogować?")) return;

    await signOut({ redirect: false });
    toast.success("Zostałeś wylogowany");
    router.push("/login");
    router.refresh();
  };

  const deleteHandler = async () => {
    if (!confirm("Czy na pewno chcesz usunąć konto?")) return;

    const response = await axios.delete("/api/deleteUser", {
      data: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) {
      await signOut({ redirect: false });
      toast.success("Twoje konto zostało usunięte");
      router.push("/register");
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
