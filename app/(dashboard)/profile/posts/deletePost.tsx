"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function DeletePostComponent({ id }: { id: string }) {
  const router = useRouter();

  const deleteComment = async () => {
    if (!confirm("Czy na pewno chcesz usunąć ten post?")) return;

    try {
      // delete post API request
      axios
        .delete("/api/posts", { data: { id } })
        .then(() => {
          toast.success("Post został pomyślnie usunięty");
          router.refresh();
        })
        .catch((err) => toast.error(err.response.data.message));
    } catch (error) {
      toast.error("Wystąpił nieoczekiwany błąd, spróbuj ponownie");
      console.error(error);
    }
  };

  return (
    <button title="Usuń post" onClick={deleteComment}>
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
