import db from "@/lib/db";
import Form from "./form";

import styles from "@/styles/blog.module.scss";

export default async function PostEditPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const post = await db.posts.findUnique({ where: { id } });

  if (!post) {
    return (
      <main>
        <h1>Ten post nie istnieje {":("}</h1>
      </main>
    );
  }

  return (
    <main className={styles.studioBackground}>
      <Form post={post} />
    </main>
  );
}
