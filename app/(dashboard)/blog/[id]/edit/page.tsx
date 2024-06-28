import db from "@/lib/db";
import Form from "./form";

export default async function EditPostPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const post = await db.posts.findUnique({ where: { id } });

  if (!post) {
    return (
      <main>
        <h1>Ten post nie istnieje {":("}</h1>
      </main>
    );
  }

  return (
    <main>
      <Form post={post} />
    </main>
  );
}
