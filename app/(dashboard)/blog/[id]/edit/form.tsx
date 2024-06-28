"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import toast from "react-hot-toast";

import pl from "date-and-time/locale/pl";
import date from "date-and-time";
date.locale(pl);

import styles from "@/styles/blog.module.scss";

interface FormValues {
  title: string;
  content: string;
}

export default function FormComponent(props: { post: any }) {
  const post = props.post;
  const router = useRouter();

  const patternString = "HH:mm, DD MMM YYYY r.";
  const pattern = date.compile(patternString);
  const formattedDate = date.format(post.createdAt, pattern);

  const { handleSubmit, register } = useForm<FormValues>();
  const [submitting, setSubmitting] = useState(false); // loading state

  const onSubmitHandler: SubmitHandler<FormValues> = async (values) => {
    if (!confirm("Czy na pewno chcesz zapisać zmiany?")) return;

    try {
      setSubmitting(true);

      const response = await fetch("/api/posts/change", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: post.id, ...values }),
      });

      if (response.ok) {
        toast.success("Post został zaktualizowany");
        router.push(`/blog/${post.id}`);
        router.refresh();
      } else {
        const error = await response.json();
        toast.error(error.message);
      }
    } catch (error) {
      toast.error("Wystąpił nieoczekiwany błąd, spróbuj ponownie");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      className={styles.postLayout}
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <div className={styles.titleContainer}>
        <TextareaAutosize
          className={styles.title}
          defaultValue={post.title}
          {...register("title")}
          required
        />

        <p>{`@${post.author} • ${formattedDate} (aktualizacja: ${patternString})`}</p>
        <hr />
      </div>

      <TextareaAutosize
        className={styles.content}
        defaultValue={post.content}
        {...register("content")}
        required
      />

      <div className={styles.actionButtons}>
        <button type="button" onClick={() => router.back()}>
          <p>Wyjdź bez zapisywania</p>
        </button>

        <button type="submit" className="green" disabled={submitting}>
          <p>{submitting ? "Ładowanie..." : "Zapisz zmiany"}</p>
        </button>
      </div>
    </form>
  );
}
