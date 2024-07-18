import { auth } from "@/lib/auth";
import Form from "./form";

import styles from "@/styles/blog.module.scss";

export default async function PostCreatePage() {
  const session = await auth();
  const user = session?.user as { id: string; username: string };

  return (
    <main className={styles.studioBackground}>
      <h1>Napisz nowy post</h1>
      <Form author={user?.username} />
    </main>
  );
}
