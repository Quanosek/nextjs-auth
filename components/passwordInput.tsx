"use client";

import Image from "next/image";
import { useState } from "react";

import styles from "@/styles/forms.module.scss";

export default function PasswordInput(params: {
  register: any;
  value: "password" | "passwordConfirm";
}) {
  const { register, value } = params;
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className={styles.passwordInput}>
      <input
        type={passwordVisible ? "text" : "password"}
        {...register(value)}
      />
      <button
        tabIndex={-1}
        type="button"
        className={styles.eyeIcon}
        onClick={() => setPasswordVisible(!passwordVisible)}
      >
        <Image
          src={`/icons/${passwordVisible ? "eye-hide" : "eye"}.svg`}
          alt=""
          height={24}
          width={24}
        />
      </button>
    </div>
  );
}
