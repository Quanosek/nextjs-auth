"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import axios from "axios";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { RegisterUserInput, registerUserSchema } from "@/lib/user-schema";

import styles from "@/styles/forms.module.scss";

export default function RegisterForm() {
  const router = useRouter();
  const { executeRecaptcha } = useGoogleReCaptcha();

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

      // registration API call
      const registerResponse = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!registerResponse.ok) {
        // handle custom errors
        const errorData = await registerResponse.json();
        toast.error(errorData.message);
      } else {
        // redirect on successful registration
        router.push("/login");
        toast.success("Pomyślnie utworzono nowe konto");
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

      <label>
        <p>Potwierdź hasło:</p>
        <input type="password" {...register("passwordConfirm")} />
        {errors["passwordConfirm"] && (
          <span>{errors["passwordConfirm"].message}</span>
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
