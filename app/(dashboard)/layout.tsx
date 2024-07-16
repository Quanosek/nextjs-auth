import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const user = session?.user;

  // hide category from sign-OUT users
  if (!user) return redirect("/login");

  return <>{children}</>;
}
