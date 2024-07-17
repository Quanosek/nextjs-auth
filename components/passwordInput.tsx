"use client";

import Image from "next/image";
import { useState } from "react";

import styles from "@/styles/forms.module.scss";

export default function PasswordInputComponent(params: {
  function: Function;
  value: string;
}) {
  const { function: register, value } = params;
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
