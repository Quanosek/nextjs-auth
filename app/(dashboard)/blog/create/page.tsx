import { auth } from "@/lib/auth";
import Form from "./form";

export default async function BlogCreatePage() {
  const session = await auth();
  const user = session?.user as any;

  return (
    <main>
      <h1>Napisz nowy post</h1>
      <Form author={user?.username} />
    </main>
  );
}
