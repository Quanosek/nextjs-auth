import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import db from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    // sign-in user authentication
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { message: "Nieuprawniony dostęp" },
        { status: 401 }
      );
    }

    const username = body.author.toLowerCase();
    const user = await db.users.findUnique({ where: { username } });

    // user not exist error
    if (!user) {
      return NextResponse.json(
        { message: "Nie znaleziono konta użytkownika" },
        { status: 400 }
      );
    }

    // create new comment
    const newComment = await db.comments.create({
      data: body,
    });

    // return success message
    const { author: _, ...comment } = newComment;

    return NextResponse.json(
      {
        message: "Pomyślnie dodano nowy komentarz",
        comment: { ...comment, author: user.username },
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

export async function DELETE(req: Request) {
  const { id } = await req.json();

  try {
    // sign-in user authentication
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { message: "Nieuprawniony dostęp" },
        { status: 401 }
      );
    }

    // delete post
    await db.comments.delete({ where: { id } });

    // return success message
    return NextResponse.json(
      { message: "Pomyślnie usunięto komentarz" },
      { status: 200 }
    );
  } catch (error) {
    // return error message
    return NextResponse.json(
      { message: "Wystąpił nieoczekiwany błąd serwera", error },
      { status: 500 }
    );
  }
}
