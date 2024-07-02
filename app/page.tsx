import Image from "next/image";
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
      <div className={styles.welcome}>
        <h1>witaj na stronie głównej</h1>

        <p>
          Ten projekt jest przykładem aplikacji{" "}
          <Link href="https://nextjs.org/docs">Next.js</Link>{" "}
          z&nbsp;wykorzystaniem autoryzacji{" "}
          <Link href="https://authjs.dev/getting-started">Auth.js</Link> ze
          zintegrowanym{" "}
          <Link href="https://developers.google.com/recaptcha/docs/v3">
            reCaptcha
          </Link>{" "}
          wraz z&nbsp;bazą danych{" "}
          <Link href="https://www.postgresql.org">PostgreSQL</Link>{" "}
          w&nbsp;połączeniu z&nbsp;
          <Link href="https://www.prisma.io/nextjs">Prisma</Link> w&nbsp;celu
          zapisywania utworzonych kont oraz możliwością dodawania, edytowania
          i&nbsp;usuwaniu postów po&nbsp;zalogowaniu.
        </p>

        <Image
          src="/icons/hash.svg"
          alt=""
          width={1000}
          height={1000}
          draggable={false}
          priority
        />
      </div>

      <div className={styles.latestPosts}>
        <h2>Najnowsze posty:</h2>

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
          <p>Zobacz wszystkie posty</p>
        </Link>
      </div>
    </main>
  );
}
