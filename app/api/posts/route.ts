import { NextResponse } from "next/server";
import db from "@/lib/db";
import Session from "@/lib/api/session";

export async function GET() {
  try {
    // all posts list
    const posts = await db.posts.findMany();

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Wystąpił nieoczekiwany błąd serwera", error },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const data = await req.json();

  try {
    Session();

    const username = data.author.toLowerCase();
    const user = await db.users.findUnique({ where: { username } });

    // user not exist
    if (!user) {
      return NextResponse.json(
        { message: "Nie znaleziono konta użytkownika" },
        { status: 400 }
      );
    }

    // new post
    const post = await db.posts.create({ data });

    return NextResponse.json(
      { message: "Pomyślnie dodano nowy post", post },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Wystąpił nieoczekiwany błąd serwera", error },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  try {
    Session();

    // update database
    const comments = await db.comments.deleteMany({ where: { postId: id } }); // delete all comments of post
    const post = await db.posts.delete({ where: { id } }); // delete post

    return NextResponse.json(
      { message: "Pomyślnie usunięto post", comments, post },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Wystąpił nieoczekiwany błąd serwera", error },
      { status: 500 }
    );
  }
}
