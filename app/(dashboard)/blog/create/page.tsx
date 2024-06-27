import { auth } from "@/lib/auth";
import Form from "./form";

export default async function BlogCreatePage() {
  const session = await auth();
  const user = session?.user as { id: string; username: string };

  return (
    <main>
      <h1>Nowy artykuł</h1>

      <Form authorId={user?.id} />
    </main>
  );
}
