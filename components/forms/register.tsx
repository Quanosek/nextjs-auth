"use client";

import { useState } from "react";

import { signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import styles from "@/styles/forms.module.scss";

import { CreateUserInput, createUserSchema } from "@/lib/user-schema";

export default function RegisterForm() {
  const [submitting, setSubmitting] = useState(false);

  const methods = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmitHandler: SubmitHandler<CreateUserInput> = async (values) => {
    try {
      setSubmitting(true);

      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorData = await res.json();

        if (Array.isArray(errorData.errors) && errorData.errors.length > 0) {
          errorData.errors.forEach((error: any) => {
            toast.error(error.message);
          });

          return;
        }

        toast.error(errorData.message);
        return;
      }

      signIn(undefined, { callbackUrl: "/" });
    } catch (error: any) {
      toast.error(error.message);
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
        <p>Nazwa użytkownika:</p>
        <input {...register("name")} />

        {errors["name"] && <span>{errors["name"]?.message as string}</span>}
      </label>

      <label>
        <p>E-mail:</p>
        <input type="email" {...register("email")} />

        {errors["email"] && <span>{errors["email"]?.message as string}</span>}
      </label>

      <label>
        <p>Hasło:</p>
        <input type="password" {...register("password")} />

        {errors["password"] && (
          <span>{errors["password"]?.message as string}</span>
        )}
      </label>

      <label>
        <p>Powtórz hasło:</p>
        <input type="password" {...register("passwordConfirm")} />

        {errors["passwordConfirm"] && (
          <span>{errors["passwordConfirm"]?.message as string}</span>
        )}
      </label>

      <button
        type="submit"
        className={styles.greenButton}
        disabled={submitting}
      >
        <p>{submitting ? "Ładowanie..." : "Zarejestruj się"}</p>
      </button>
    </form>
  );
}
