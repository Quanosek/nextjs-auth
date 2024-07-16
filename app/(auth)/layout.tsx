import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import ReCaptchaWrapper from "@/components/wrappers/reCaptcha";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const user = session?.user;

  // hide category from sign-IN users
  if (user) return redirect("/profile");

  return <ReCaptchaWrapper>{children}</ReCaptchaWrapper>;
}
