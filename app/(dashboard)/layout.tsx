import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { auth } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();
  const user = session?.user;

  // hide category from logged-OUT users
  if (!user) return redirect("/login");

  return <>{children}</>;
}
