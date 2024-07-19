"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

export default function DeletePostComponent({ id }: { id: string }) {
  const router = useRouter();

  const clickHandler = async () => {
    if (!confirm("Czy na pewno chcesz usunąć ten post?")) return;

    try {
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
    }
  };

  return (
    <button className="red" onClick={clickHandler}>
      <p>Usuń post</p>
    </button>
  );
}
