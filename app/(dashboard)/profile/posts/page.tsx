import Image from "next/image";
import Link from "next/link";
import { auth } from "@/lib/auth";
import db from "@/lib/db";
import DeletePost from "./deletePost";

import pl from "date-and-time/locale/pl";
import date from "date-and-time";
date.locale(pl);

import styles from "@/styles/dashboard.module.scss";

export default async function ProfilePostsPage() {
  const session = await auth();
  const user = session?.user as { id: string; username: string };

  const posts = await db.posts.findMany({
    where: { author: { equals: user?.username } },
    orderBy: { createdAt: "desc" },
  });

  const pattern = date.compile("HH:mm, DD MMM YYYY r.");

  return (
    <main>
      <div className={styles.pageTitle}>
        <h1>Twoje posty</h1>
        <hr className="accent-line" />
      </div>

      <div className={styles.list}>
        {!posts.length && <h2 style={{ opacity: "65%" }}>brak postów</h2>}

        {posts.map(async (posts, i) => {
          const post = await db.posts.findUnique({
            where: { id: posts.id },
          });

          return (
            <div key={i} className={styles.elementsList}>
              <Link href={`/blog/${posts.id}`} className={styles.elementLink}>
                <div>
                  <h2>{posts.title}</h2>
                  <p className={styles.date}>
                    {date.format(posts.createdAt, pattern)}
                  </p>
                </div>

                <p className={styles.text}>{post?.content}</p>
              </Link>

              <div className={styles.actions}>
                <Link href={`/blog/${posts.id}/edit`}>
                  <Image
                    src="/icons/edit.svg"
                    alt=""
                    width={25}
                    height={25}
                    draggable={false}
                  />
                </Link>

                <DeletePost id={posts.id} />
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
