import db from "@/lib/db";

import styles from "@/styles/blog.module.scss";

export default async function ArticlePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const article = await db.article.findUnique({ where: { id } });

  if (!article) {
    return (
      <main>
        <h1>Artykuł nie istnieje</h1>
      </main>
    );
  }

  const author = await db.user.findUnique({ where: { id: article.authorId } });
  const formattedDate = new Date(article.createdAt).toLocaleString("pl-PL");

  return (
    <main>
      <div className={styles.titleSection}>
        <h1>{article.title}</h1>
        <p>{`@${author?.username} • ${formattedDate}`}</p>
        <hr />
      </div>

      <p className={styles.content}>{article.content}</p>
    </main>
  );
}
