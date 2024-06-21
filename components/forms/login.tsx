"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { LoginUserInput, loginUserSchema } from "@/lib/user-schema";

import styles from "@/styles/forms.module.scss";

export default function LoginForm() {
  const [submitting, setSubmitting] = useState(false); // loading state

  const methods = useForm<LoginUserInput>({
    resolver: zodResolver(loginUserSchema),
  });

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmitHandler: SubmitHandler<LoginUserInput> = async (values) => {
    try {
      setSubmitting(true);

      const res = await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: true,
        callbackUrl: "/profile",
      });

      setSubmitting(false);

      if (res?.error) {
        reset({ password: "" });
        toast.error("Niepoprawny adres e-mail lub hasło");
      }
    } catch (error) {
      toast.error("Wystąpił nieoczekiwany błąd");
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
        <p>Login:</p>
        <input type="text" {...register("username")} />
        {errors["username"] && <span>{errors["username"]?.message}</span>}
      </label>

      <label>
        <p>Hasło:</p>
        <input type="password" {...register("password")} />
        {errors["password"] && <span>{errors["password"]?.message}</span>}
      </label>

      <button type="submit" className={styles.blueButton} disabled={submitting}>
        <p>{submitting ? "Ładowanie..." : "Zaloguj się"}</p>
      </button>
    </form>
  );
}
