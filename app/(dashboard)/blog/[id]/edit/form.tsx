"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import toast from "react-hot-toast";

import styles from "@/styles/blog.module.scss";

interface FormValues {
  title: string;
  content: string;
}

export default function FormComponent(props: { post: any }) {
  const post = props.post;
  const router = useRouter();

  const formattedDate = new Date(post.createdAt).toLocaleString("pl-PL");

  const { handleSubmit, register } = useForm<FormValues>();
  const [submitting, setSubmitting] = useState(false); // loading state

  const submitHandler: SubmitHandler<FormValues> = async (values) => {
    if (!confirm("Czy na pewno chcesz zapisać zmiany?")) return;

    try {
      setSubmitting(true);

      console.log(values); //TODO: save changes to post in database

      //
      //
      //
    } catch (error) {
      toast.error("Wystąpił nieoczekiwany błąd, spróbuj ponownie");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className={styles.postLayout} onSubmit={handleSubmit(submitHandler)}>
      <div className={styles.titleContainer}>
        <TextareaAutosize
          className={styles.title}
          defaultValue={post.title}
          {...register("title")}
          required
        />

        <p>{`@${post.author} • ${formattedDate}`}</p>
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
