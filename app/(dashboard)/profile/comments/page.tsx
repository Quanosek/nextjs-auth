import Link from "next/link";
import { auth } from "@/lib/auth";
import db from "@/lib/db";
import DeleteButton from "./deleteButton";

import pl from "date-and-time/locale/pl";
import date from "date-and-time";
date.locale(pl);

import styles from "@/styles/dashboard.module.scss";

export default async function CommentsPage() {
  const session = await auth();
  const user = session?.user as { id: string; username: string };

  const comments = await db.comments.findMany({
    where: {
      author: {
        equals: user?.username,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const pattern = date.compile("HH:mm, DD MMM YYYY r.");

  return (
    <main>
      <div className={styles.pageTitle}>
        <h1>Wszystkie twoje komentarze</h1>
        <hr className="accent-line" />
      </div>

      <div className={styles.comments}>
        {comments.map(async (comment, i) => {
          const post = await db.posts.findUnique({
            where: {
              id: comment.postId,
            },
          });

          return (
            <div key={i} className={styles.comment}>
              <Link href={`/blog/${comment.postId}#${comment.id}`}>
                <div>
                  <h2>{comment.text}</h2>
                  <p className={styles.date}>
                    {date.format(comment.createdAt, pattern)}
                  </p>
                </div>

                <p>
                  Post: {'"'}
                  {post?.title}
                  {'"'}
                </p>
              </Link>

              <DeleteButton id={comment.id} />
            </div>
          );
        })}
      </div>
    </main>
  );
}
