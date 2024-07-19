"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function DeletePostComponent({ id }: { id: string }) {
  const router = useRouter();

  const [submitting, setSubmitting] = useState(false); // loading state

  const clickHandler = async () => {
    if (!confirm("Czy na pewno chcesz usunąć ten post?")) return;

    try {
      setSubmitting(true);

      // delete post API request
      axios
        .delete("/api/posts", { data: { id } })
        .then(() => {
          toast.success("Post został pomyślnie usunięty");
          router.push("/blog");
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
    <button className="red" onClick={clickHandler} disabled={submitting}>
      <p>{submitting ? "Ładowanie..." : "Usuń post"}</p>
    </button>
  );
}
