"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function DeleteButtonComponent(props: { id: string }) {
  const id = props.id;
  const router = useRouter();

  const clickHandler = async () => {
    if (!confirm("Czy na pewno chcesz usunąć ten post?")) return;

    try {
      const response = await fetch("/api/posts", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        toast.success("Post został pomyślnie usunięty");
        router.push("/blog");
        router.refresh();
      } else {
        const error = await response.json();
        toast.error(error.message);
      }
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
