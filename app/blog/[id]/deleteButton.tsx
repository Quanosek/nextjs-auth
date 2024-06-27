"use client";

export default function DeleteButtonComponent(props: { id: string }) {
  const id = props.id;

  const clickHandler = () => {
    if (!confirm("Czy na pewno chcesz usunąć ten post?")) return;

    //TODO: delete post with id from database
  };

  return (
    <button className="red" onClick={clickHandler}>
      <p>Usuń post</p>
    </button>
  );
}
