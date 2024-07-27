"use client";

import Image from "next/image";
import { useState, useRef } from "react";

import styles from "@/styles/forms.module.scss";

export default function PasswordInputComponent({
  function: register,
  value,
}: {
  function: Function;
  value: string;
}) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const type = useRef("off");
  if (value === "newPassword") type.current = "new-password";
  else if (value === "currentPassword" || value === "password") {
    type.current = "current-password";
  }

  return (
    <div className={styles.passwordInput}>
      <input
        type={passwordVisible ? "text" : "password"}
        {...register(value)}
        autoComplete={type.current}
        maxLength={100}
      />
      <button
        tabIndex={-1}
        type="button"
        name="toggle"
        className={styles.eyeIcon}
        onClick={() => setPasswordVisible(!passwordVisible)}
      >
        <Image
          src={`/icons/${passwordVisible ? "eye" : "eye-hide"}.svg`}
          alt=""
          height={24}
          width={24}
          draggable={false}
          priority
        />
      </button>
    </div>
  );
}
