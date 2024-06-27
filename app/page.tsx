import Link from "next/link";
import db from "@/lib/db";

import styles from "@/styles/home.module.scss";

export default async function HomePage() {
  const posts = await db.posts.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <main>
      <h1>Strona główna</h1>

      <div className={styles.postsList}>
        {posts.map((post) => {
          const formattedDate = new Date(post.createdAt).toLocaleString(
            "pl-PL"
          );

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
