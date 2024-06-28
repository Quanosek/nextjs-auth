import Link from "next/link";
import db from "@/lib/db";

import pl from "date-and-time/locale/pl";
import date from "date-and-time";
date.locale(pl);

import styles from "@/styles/blog.module.scss";

export default async function BlogListPage() {
  const posts = await db.posts.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main>
      <h1>Wszystkie posty na blogu</h1>

      <div className={styles.postsGrid}>
        {posts.map(async (post: any) => {
          const pattern = date.compile("HH:mm, DD MMM YYYY r.");
          const formattedDate = date.format(post.createdAt, pattern);

          return (
            <Link key={post.id} href={`/blog/${post.id}`}>
              <h2>{post.title}</h2>
              <p>{`@${post.author} • ${formattedDate}`}</p>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
