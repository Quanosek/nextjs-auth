"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import toast from "react-hot-toast";
import axios from "axios";

import pl from "date-and-time/locale/pl";
import date from "date-and-time";
date.locale(pl);

import styles from "@/styles/blog.module.scss";

interface FormValues {
  title: string;
  content: string;
}

export default function FormComponent({ post }: any) {
  const router = useRouter();

  const patternString = "HH:mm, DD MMM YYYY r.";
  const pattern = date.compile(patternString);
  const formattedDate = date.format(post.createdAt, pattern);

  const { reset, handleSubmit, register } = useForm<FormValues>();
  const [submitting, setSubmitting] = useState(false); // loading state

  const onSubmitHandler: SubmitHandler<FormValues> = async (values) => {
    if (!confirm("Czy na pewno chcesz zapisać zmiany?")) return;

    try {
      setSubmitting(true);

      if (values.content.trim() === "" || values.title.trim() === "") {
        reset();
        toast.error("Pola nie mogą pozostać puste");
        return;
      }

      // update post API request
      axios
        .post("/api/posts/change", { id: post.id, ...values })
        .then(() => {
          toast.success("Post został zaktualizowany");
          router.replace(`/blog/${post.id}`);
          router.refresh();
        })
        .catch((err) => toast.error(err.response.data.message));
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
          maxLength={500}
          required
        />

        <p>
          {`@${post.author} • `}
          <span>{`${formattedDate} (aktualizacja: ${patternString})`}</span>
        </p>
        <hr />
      </div>

      <TextareaAutosize
        className={styles.content}
        defaultValue={post.content}
        {...register("content")}
        maxLength={50000}
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
