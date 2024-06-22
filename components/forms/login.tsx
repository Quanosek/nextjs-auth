"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import axios from "axios";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { LoginUserInput, loginUserSchema } from "@/lib/user-schema";

import styles from "@/styles/forms.module.scss";

export default function LoginForm() {
  const router = useRouter();
  const { executeRecaptcha } = useGoogleReCaptcha();

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
    const { username, password } = values;

    if (!executeRecaptcha) {
      return toast.error("Wystąpił błąd podczas ładowania reCAPTCHA");
    }

    try {
      setSubmitting(true);

      // reCAPTCHA verification
      const reCaptchaToken = await executeRecaptcha("register");
      const reCaptchaResponse = await axios.post(
        "/api/reCaptcha",
        { reCaptchaToken },
        {
          headers: {
            Accept: "application/json text/plain */*",
            "Content-Type": "application/json",
          },
        }
      );

      console.log("reCaptcha score:", reCaptchaResponse.data.score);

      if (!reCaptchaResponse.data.success) {
        return toast.error("Wystąpił błąd podczas weryfikacji reCAPTCHA");
      }

      // sign in API verification
      const loginResponse = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      setSubmitting(false);

      if (loginResponse?.error) {
        reset({ password: "" });
        toast.error("Niepoprawny adres e-mail lub hasło");
      } else {
        // update user session
        router.refresh();
        toast.success(`Witaj ponownie, @${username}!`);
      }
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
        <p>Login:</p>
        <input type="text" {...register("username")} />
        {errors["username"] && <span>{errors["username"].message}</span>}
      </label>

      <label>
        <p>Hasło:</p>
        <input type="password" {...register("password")} />
        {errors["password"] && <span>{errors["password"].message}</span>}
      </label>

      <button type="submit" className={styles.blueButton} disabled={submitting}>
        <p>{submitting ? "Ładowanie..." : "Zaloguj się"}</p>
      </button>
    </form>
  );
}
