import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { auth } from "@/lib/auth";
import ReCaptchaWrapper from "@/components/wrappers/reCaptcha";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();
  const user = session?.user;

  // hide category from logged-IN users
  if (user) return redirect("/profile");

  return <ReCaptchaWrapper>{children}</ReCaptchaWrapper>;
}
