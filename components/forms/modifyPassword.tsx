"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { RegisterUserInput, registerUserSchema } from "@/lib/user-schema";
import PasswordInput from "./passwordInput";

import styles from "@/styles/forms.module.scss";

export default function ModifyPassword() {
  const [submitting, setSubmitting] = useState(false); // loading state
  const methods = useForm<RegisterUserInput>({
    resolver: zodResolver(registerUserSchema),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmitHandler: SubmitHandler<RegisterUserInput> = async (values) => {
    try {
      setSubmitting(true);
      console.log(values);
    } catch (error) {
      toast.error("Wystąpił nieoczekiwany błąd");
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
        <p>Stare hasło:</p>
        <PasswordInput register={register} value="password" />
        {errors["password"] && <span>{errors["password"].message}</span>}
      </label>

      <label>
        <p>Nowe hasło:</p>
        <PasswordInput register={register} value="password" />
        {errors["password"] && <span>{errors["password"].message}</span>}
      </label>

      <label>
        <p>Powtórz nowe hasło:</p>
        <PasswordInput register={register} value="password" />
        {errors["password"] && <span>{errors["password"].message}</span>}
      </label>

      <button type="submit" disabled={submitting}>
        <p>{submitting ? "Ładowanie..." : "Zmień hasło"}</p>
      </button>
    </form>
  );
}
