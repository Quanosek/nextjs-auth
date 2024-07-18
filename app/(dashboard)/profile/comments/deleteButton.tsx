"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function DeleteButtonComponent({ id }: { id: string }) {
  const router = useRouter();

  const deleteComment = async () => {
    if (!confirm("Czy na pewno chcesz usunąć ten komentarz?")) return;

    try {
      // delete post API request
      axios
        .delete("/api/comments", { data: { id } })
        .then(() => {
          toast.success("Komentarz został pomyślnie usunięty");
          router.refresh();
        })
        .catch((err) => toast.error(err.response.data.message));
    } catch (error) {
      toast.error("Wystąpił nieoczekiwany błąd, spróbuj ponownie");
      console.error(error);
    }
  };

  return (
    <button title="Usuń komentarz" onClick={deleteComment}>
      <Image
        src="/icons/delete.svg"
        alt="x"
        width={25}
        height={25}
        draggable={false}
      />
    </button>
  );
}
