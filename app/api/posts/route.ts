import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    // get all posts
    const posts = await db.posts.findMany();

    // return success message
    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    // return error message
    return NextResponse.json(
      { message: "Wystąpił nieoczekiwany błąd serwera", error },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const username = body.author.toLowerCase();
    const user = await db.users.findUnique({ where: { username } });

    // user not exist error
    if (!user) {
      return NextResponse.json(
        { message: "Nie znaleziono konta użytkownika" },
        { status: 400 }
      );
    }

    // create new post
    const newPost = await db.posts.create({
      data: body,
    });

    // return success message
    const { author: _, ...post } = newPost;

    return NextResponse.json(
      {
        message: "Pomyślnie dodano nowy post",
        post: { ...post, author: user.username },
      },
      { status: 201 }
    );
  } catch (error) {
    // return error message
    return NextResponse.json(
      { message: "Wystąpił nieoczekiwany błąd serwera", error },
      { status: 500 }
    );
  }
}
