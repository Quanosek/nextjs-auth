"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import styles from "@/styles/forms.module.scss";

import { LoginUserInput, loginUserSchema } from "@/lib/user-schema";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/profile";

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
        redirect: false,
        email: values.email,
        password: values.password,
        redirectTo: callbackUrl,
      });

      setSubmitting(false);

      if (!res?.error) {
        toast.success("successfully logged in");
        router.push(callbackUrl);
      } else {
        reset({ password: "" });
        const message = "invalid email or password";
        toast.error(message);
        setError(message);
      }
    } catch (error: any) {
      toast.error(error.message);
      setError(error.message);
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

      <button type="submit" className={styles.blueButton} disabled={submitting}>
        <p>{submitting ? "Ładowanie..." : "Zaloguj się"}</p>
      </button>
    </form>
  );
}
