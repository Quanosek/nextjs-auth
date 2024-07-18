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
import PasswordInput from "@/components/passwordInput";

import styles from "@/styles/forms.module.scss";

export default function FormComponent() {
  const router = useRouter();

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginUserInput>({
    resolver: zodResolver(loginUserSchema),
  });

  const { executeRecaptcha } = useGoogleReCaptcha();
  const [submitting, setSubmitting] = useState(false); // loading state

  const onSubmitHandler: SubmitHandler<LoginUserInput> = async (values) => {
    if (!executeRecaptcha) {
      return toast.error("Wystąpił błąd podczas ładowania reCAPTCHA");
    }

    try {
      setSubmitting(true);

      // reCAPTCHA verification
      const reCaptchaToken = await executeRecaptcha("register");
      const reCaptchaResponse = await axios.post("/api/reCaptcha", {
        reCaptchaToken,
      });

      console.log("reCaptcha score:", reCaptchaResponse.data.score);

      if (!reCaptchaResponse.data.success) {
        return toast.error("Wystąpił błąd podczas weryfikacji reCAPTCHA");
      }

      const username = values.username.toLowerCase();

      // sign in API verification
      const loginResponse = await signIn("credentials", {
        username,
        password: values.password,
        redirect: false,
      });

      if (loginResponse?.error) {
        reset({ password: "" });
        toast.error("Niepoprawny adres e-mail lub hasło");
      } else {
        toast.success(`Witaj ponownie, @${username}!`);
        const redirect = localStorage.getItem("redirect");

        if (redirect) router.push(redirect);
        else router.push("/profile");

        router.refresh();
        localStorage.clear();
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
        <p>Login:</p>
        <input {...register("username")} maxLength={100} />
        {errors["username"] && <span>{errors["username"].message}</span>}
      </label>

      <label>
        <p>Hasło:</p>
        <PasswordInput function={register} value="password" />
        {errors["password"] && <span>{errors["password"].message}</span>}
      </label>

      <button type="submit" className="blue" disabled={submitting}>
        <p>{submitting ? "Ładowanie..." : "Zaloguj się"}</p>
      </button>
    </form>
  );
}
