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

export default function FormComponent(params: { author: string }) {
  const { author } = params;
  if (!author) return;

  const router = useRouter();
  const { handleSubmit, register } = useForm<FormValues>();

  const onSubmitHandler: SubmitHandler<FormValues> = async (values) => {
    if (!confirm("Czy na pewno chcesz opublikować ten artykuł?")) return;

    try {
      // registration API call
      const response = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author, ...values }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Opublikowano nowy artykuł");
        router.push(`/blog/${data.post.id}`);
        router.refresh();
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
          required
        />
      </label>

      <label>
        <p>Treść:</p>
        <TextareaAutosize
          placeholder="Lorem ipsum dolor sit amet consectetur..."
          {...register("content")}
          required
        />
      </label>

      <button>Opublikuj</button>
    </form>
  );
}