"use client";

import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import TextareaAutosize from "react-textarea-autosize";

import styles from "@/styles/forms.module.scss";

interface FormValues {
  title: string;
  content: string;
}

export default function FormComponent(params: { authorId: string }) {
  const authorId = params.authorId;

  const router = useRouter();
  const { handleSubmit, register } = useForm<FormValues>();

  const onSubmitHandler: SubmitHandler<FormValues> = async (values) => {
    try {
      // registration API call
      const response = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ authorId, ...values }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Opublikowano nowy artykuł");
        router.push(`/blog/${data.article.id}`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Wystąpił nieoczekiwany błąd, spróbuj ponownie");
      console.error(error);
    }
  };

  return (
    <form
      className={styles.formLayout}
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <label>
        <p>Tytuł:</p>
        <input
          type="text"
          placeholder="Najlepsze domki w górach"
          {...register("title")}
        />
      </label>

      <label>
        <p>Treść:</p>
        <TextareaAutosize
          placeholder="Lorem ipsum dolor sit amet consectetur..."
          {...register("content")}
        />
      </label>

      <button>Opublikuj</button>
    </form>
  );
}
