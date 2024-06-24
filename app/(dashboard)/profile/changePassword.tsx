"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { ChangePasswordInput, ChangePasswordSchema } from "@/lib/user-schema";
import PasswordInput from "@/components/passwordInput";

import styles from "@/styles/forms.module.scss";

export default function ChangePasswordComponent(param: { username: string }) {
  const username = param.username;

  const [submitting, setSubmitting] = useState(false); // loading state
  const methods = useForm<ChangePasswordInput>({
    resolver: zodResolver(ChangePasswordSchema),
  });

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmitHandler: SubmitHandler<ChangePasswordInput> = async (
    values
  ) => {
    try {
      setSubmitting(true);

      if (values.currentPassword === values.newPassword) {
        reset({ newPassword: "", newPasswordConfirm: "" });
        toast.error("Nowe hasło musi się różnić od obecnego");
        return;
      }

      const changePassword = await fetch("/api/changePassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, ...values }),
      });

      if (changePassword.ok) {
        reset({ currentPassword: "", newPassword: "", newPasswordConfirm: "" });
        toast.success("Twoje hasło zostało zmienione");
      } else {
        const errorData = await changePassword.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      toast.error("Wystąpił nieoczekiwany błąd, spróbuj ponownie");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      className={styles.formLayout}
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <label>
        <p>Obecne hasło:</p>
        <PasswordInput function={register} value="currentPassword" />
        {errors["currentPassword"] && (
          <span>{errors["currentPassword"].message}</span>
        )}
      </label>

      <label>
        <p>Nowe hasło:</p>
        <PasswordInput function={register} value="newPassword" />
        {errors["newPassword"] && <span>{errors["newPassword"].message}</span>}
      </label>

      <label>
        <p>Powtórz nowe hasło:</p>
        <PasswordInput function={register} value="newPasswordConfirm" />
        {errors["newPasswordConfirm"] && (
          <span>{errors["newPasswordConfirm"].message}</span>
        )}
      </label>

      <button type="submit" disabled={submitting}>
        <p>{submitting ? "Ładowanie..." : "Zmień hasło"}</p>
      </button>
    </form>
  );
}
