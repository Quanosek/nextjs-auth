"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import axios from "axios";
import { ChangePasswordInput, ChangePasswordSchema } from "@/lib/user-schema";
import PasswordInput from "@/components/passwordInput";

import styles from "@/styles/forms.module.scss";

export default function ChangePasswordComponent(params: { username: string }) {
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ChangePasswordInput>({
    resolver: zodResolver(ChangePasswordSchema),
  });

  const [submitting, setSubmitting] = useState(false); // loading state

  const onSubmitHandler: SubmitHandler<ChangePasswordInput> = async (
    values
  ) => {
    try {
      setSubmitting(true);

      if (values.currentPassword === values.newPassword) {
        reset({ newPassword: "", newPasswordConfirm: "" });
        toast.error("Nowe hasło nie może być takie samo jak obecnie używane");
        return;
      }

      // update user password API request
      axios
        .post("/api/users/password", { username: params.username, ...values })
        .then(() => {
          reset({
            currentPassword: "",
            newPassword: "",
            newPasswordConfirm: "",
          });
          toast.success("Twoje hasło zostało zmienione");
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
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
