import Link from "next/link";
import db from "@/lib/db";

import pl from "date-and-time/locale/pl";
import date from "date-and-time";
date.locale(pl);

import styles from "@/styles/home.module.scss";

export default async function HomePage() {
  const posts = await db.posts.findMany({
    orderBy: { createdAt: "desc" },
    take: 4,
  });

  return (
    <main>
      <h1>Strona główna</h1>

      <div className={styles.postsList}>
        {posts.map((post) => {
          const pattern = date.compile("HH:mm, DD MMM YYYY r.");
          const formattedDate = date.format(post.createdAt, pattern);

          return (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className={styles.post}
            >
              <h2>{post.title}</h2>
              <span>{`@${post.author} • ${formattedDate}`}</span>

              <p>{post.content}</p>
            </Link>
          );
        })}
      </div>

      <Link href="/blog" className="button">
        <p>Zobacz więcej postów</p>
      </Link>
    </main>
  );
}
