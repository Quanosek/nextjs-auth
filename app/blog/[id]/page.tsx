import Link from "next/link";
import { auth } from "@/lib/auth";
import db from "@/lib/db";
import DeleteButton from "./deleteButton";
import AddComment from "./addComment";

import pl from "date-and-time/locale/pl";
import date from "date-and-time";
date.locale(pl);

import styles from "@/styles/blog.module.scss";

export default async function PostPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const session = await auth();
  const user = session?.user as { username: string } | null;

  const post = await db.posts.findUnique({ where: { id } });
  if (!post) {
    return (
      <main>
        <h1>Ten post nie istnieje {":("}</h1>
      </main>
    );
  }

  const pattern = date.compile("HH:mm, DD MMM YYYY r.");
  let formattedDate = date.format(post.createdAt, pattern);

  // If post was updated, display updated date
  if (post.createdAt.getTime() !== post.updatedAt.getTime()) {
    const updatedDate = date.format(post.updatedAt, pattern);
    formattedDate = formattedDate.concat(` (aktualizacja: ${updatedDate})`);
  }

  const authorView = post.author === user?.username;

  const comments = await db.comments.findMany({ where: { postId: post.id } });

  return (
    <main>
      <div className={styles.postLayout}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>{post.title}</h1>

          <p>
            {`@${post.author} • `}
            <span>{formattedDate}</span>
          </p>
          <hr />
        </div>

        <p className={styles.content}>{post.content}</p>

        {authorView && (
          <div className={styles.actionButtons}>
            <Link href={`/blog/${post.id}/edit`} className="button blue">
              <p>Edytuj treść</p>
            </Link>

            <DeleteButton id={post.id} />
          </div>
        )}

        <div className={styles.commentsContainer}>
          <h2>Komentarze: ({comments.length})</h2>
          <hr />

          <div className={styles.commentsList}>
            {comments.map((comment, i) => (
              <div key={i} id={comment.id} className={styles.comment}>
                <h3>
                  {`@${comment.author} • `}
                  <span>{date.format(comment.createdAt, pattern)}</span>
                </h3>
                <p>{comment.text}</p>
              </div>
            ))}

            {!comments.length && (
              <p className={styles.noComments}>Brak komentarzy</p>
            )}
          </div>

          {user && <AddComment postId={post.id} author={user.username} />}

          {!user && (
            <Link href="/login" className="button blue">
              Zaloguj się, aby dodać komentarz
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
