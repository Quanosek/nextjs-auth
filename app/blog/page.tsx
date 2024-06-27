import Link from "next/link";
import db from "@/lib/db";

import styles from "@/styles/blog.module.scss";

export default async function BlogListPage() {
  const articles = await db.posts.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main>
      <h1>Wszystkie posty na blogu</h1>

      <div className={styles.articlesGrid}>
        {articles.map(async (article: any) => {
          const formattedDate = new Date(article.createdAt).toLocaleString(
            "pl-PL"
          );

          return (
            <Link key={article.id} href={`/blog/${article.id}`}>
              <h2>{article.title}</h2>
              <p>{`@${article.author} • ${formattedDate}`}</p>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
