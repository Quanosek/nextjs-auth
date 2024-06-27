import Link from "next/link";
import db from "@/lib/db";

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
          const formattedDate = new Date(post.createdAt).toLocaleString(
            "pl-PL"
          );

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
