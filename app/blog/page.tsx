import Link from "next/link";
import db from "@/lib/db";

import pl from "date-and-time/locale/pl";
import date from "date-and-time";
date.locale(pl);

import styles from "@/styles/blog.module.scss";

export default async function BlogPage() {
  const posts = await db.posts.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main>
      <div className={styles.pageTitle}>
        <h1>Wszystkie posty</h1>
        <hr className="accent-line" />
      </div>

      <div className={styles.blogGrid}>
        {posts.map(async (post, i) => {
          const pattern = date.compile("HH:mm, DD MMM YYYY r.");
          const formattedDate = date.format(post.createdAt, pattern);

          return (
            <Link key={i} href={`/blog/${post.id}`} title={`"${post.title}"`}>
              <h2>{post.title}</h2>
              <span>{`@${post.author} • ${formattedDate}`}</span>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
