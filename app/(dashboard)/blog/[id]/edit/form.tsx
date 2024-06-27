"use client";

import { useRouter } from "next/navigation";
import TextareaAutosize from "react-textarea-autosize";

import styles from "@/styles/blog.module.scss";

export default function FormComponent(props: { post: any }) {
  const post = props.post;
  const router = useRouter();

  const formattedDate = new Date(post.createdAt).toLocaleString("pl-PL");

  return (
    <div className={styles.postLayout}>
      <div className={styles.titleContainer}>
        <TextareaAutosize
          className={styles.title}
          defaultValue={post.title}
          required
        />

        <p>{`@${post.author} • ${formattedDate}`}</p>
        <hr />
      </div>

      <TextareaAutosize
        className={styles.content}
        defaultValue={post.content}
        required
      />

      <div className={styles.actionButtons}>
        <button onClick={() => router.back()}>
          <p>Wyjdź bez zapisywania</p>
        </button>

        <button className="green" onClick={() => {}}>
          <p>Zapisz zmiany</p>
        </button>
      </div>
    </div>
  );
}
