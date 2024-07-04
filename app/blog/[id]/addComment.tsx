"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import TextareaAutosize from "react-textarea-autosize";

interface FormValues {
  value: string;
}

export default function AddCommentComponent() {
  const { handleSubmit, register } = useForm<FormValues>();
  const [submitting, setSubmitting] = useState(false); // loading state

  const onSubmitHandler: SubmitHandler<FormValues> = async (values) => {
    try {
      setSubmitting(true);

      console.log(values);
    } catch (error) {
      toast.error("Wystąpił nieoczekiwany błąd, spróbuj ponownie");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <TextareaAutosize
        placeholder="Dodaj komentarz..."
        {...register("value")}
        required
      />

      <button type="submit" disabled={submitting}>
        <p>{submitting ? "Ładowanie..." : "Dodaj komentarz"}</p>
      </button>
    </form>
  );
}
