"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import toast from "react-hot-toast";
import axios from "axios";

import styles from "@/styles/blog.module.scss";

interface FormValues {
  text: string;
}

export default function AddCommentComponent({
  postId,
  author,
}: {
  postId: string;
  author: string;
}) {
  const router = useRouter();

  const { reset, handleSubmit, register } = useForm<FormValues>();
  const [submitting, setSubmitting] = useState(false); // loading state

  const onSubmitHandler: SubmitHandler<FormValues> = async (values) => {
    try {
      setSubmitting(true);

      if (values.text.trim() === "") {
        reset();
        toast.error("Komentarz nie może być pusty");
        return;
      }

      axios
        .post("/api/comments", { ...values, author, postId })
        .then(() => {
          reset();
          toast.success("Dodano nowy komentarz");
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
      className={styles.newComment}
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <TextareaAutosize
        placeholder="Dodaj komentarz..."
        {...register("text")}
        maxLength={1000}
        required
      />

      <button type="submit" disabled={submitting}>
        <p>{submitting ? "Ładowanie..." : "Dodaj komentarz"}</p>
      </button>
    </form>
  );
}
