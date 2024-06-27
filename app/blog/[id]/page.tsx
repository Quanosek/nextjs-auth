import Link from "next/link";
import { auth } from "@/lib/auth";
import db from "@/lib/db";
import DeleteButton from "./deleteButton";

import styles from "@/styles/blog.module.scss";

export default async function PostPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const session = await auth();
  const user = session?.user as { username: string } | null;

  const post = await db.posts.findUnique({ where: { id } });
  if (!post) {
    return (
      <main>
        <h1>Wpis nie istnieje {":("}</h1>
      </main>
    );
  }

  const canEdit = post.author === user?.username;
  const formattedDate = new Date(post.createdAt).toLocaleString("pl-PL");

  return (
    <main>
      <div className={styles.postLayout}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>{post.title}</h1>

          <p>{`@${post.author} • ${formattedDate}`}</p>
          <hr />
        </div>

        <p className={styles.content}>{post.content}</p>

        {canEdit && (
          <div className={styles.actionButtons}>
            <Link href={`/blog/${post.id}/edit`} className="button blue">
              <p>Edytuj treść</p>
            </Link>

            <DeleteButton id={post.id} />
          </div>
        )}
      </div>
    </main>
  );
}
