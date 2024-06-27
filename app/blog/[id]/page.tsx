import db from "@/lib/db";

import styles from "@/styles/blog.module.scss";

export default async function ArticlePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const article = await db.posts.findUnique({ where: { id } });

  if (!article) {
    return (
      <main>
        <h1>Wpis nie istnieje {":("}</h1>
      </main>
    );
  }

  const formattedDate = new Date(article.createdAt).toLocaleString("pl-PL");

  return (
    <main>
      <div className={styles.articleLayout}>
        <div className={styles.title}>
          <h1>{article.title}</h1>
          <p>{`@${article.author} • ${formattedDate}`}</p>
          <hr />
        </div>

        <p className={styles.content}>{article.content}</p>
      </div>
    </main>
  );
}
