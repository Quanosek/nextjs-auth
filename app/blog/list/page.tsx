import Link from "next/link";
import db from "@/lib/db";

import styles from "@/styles/blog.module.scss";

export default async function BlogListPage() {
  const articles = await db.article.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main>
      <h1>Lista wszystkich artykułów</h1>

      <div className={styles.articlesGrid}>
        {articles.map(async (article: any, i: number) => {
          const author = await db.user.findUnique({
            where: { id: articles[i].authorId },
          });

          const formattedDate = new Date(article.createdAt).toLocaleString(
            "pl-PL"
          );

          return (
            <Link key={article.id} href={`/blog/${article.id}`}>
              <h2>{article.title}</h2>
              <p>{`@${author?.username} • ${formattedDate}`}</p>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
