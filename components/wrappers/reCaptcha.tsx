"use client";

import { ReactNode } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export default function ReCaptcha({ children }: { children: ReactNode }) {
  const reCaptchaKey: string | undefined =
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  return (
    <GoogleReCaptchaProvider reCaptchaKey={reCaptchaKey ?? ""}>
      {children}
    </GoogleReCaptchaProvider>
  );
}
