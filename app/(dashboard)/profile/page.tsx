import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    return redirect("/login");
  }

  const user = session?.user;

  return (
    <main>
      <h1>Twoje konto</h1>

      <div>
        <p>ID: {user?.id}</p>
        <p>Name: {user?.name}</p>
        <p>Email: {user?.email}</p>
      </div>
    </main>
  );
}
