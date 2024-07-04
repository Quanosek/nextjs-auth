import { auth } from "@/lib/auth";
import Form from "./form";

import styles from "@/styles/blog.module.scss";

export default async function BlogCreatePage() {
  const session = await auth();
  const user = session?.user as any;

  return (
    <main className={styles.studioBackground}>
      <h1>Napisz nowy post</h1>
      <Form author={user?.username} />
    </main>
  );
}
