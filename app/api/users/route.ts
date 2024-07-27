import { NextResponse } from "next/server";
import db from "@/lib/db";
import { hash } from "bcrypt";
import Session from "@/lib/api/session";

export async function POST(req: Request) {
  const data = await req.json();

  try {
    // username is taken
    const username = data.username.toLowerCase();
    const existingUser = await db.users.findUnique({ where: { username } });

    if (existingUser) {
      return NextResponse.json(
        { message: "Podana nazwa użytkownika jest już zajęta" },
        { status: 409 }
      );
    }

    // secure password value
    const password = await hash(data.password, 12);

    // create new user
    const { password: _, ...user } = await db.users.create({
      data: { username, password },
    });

    // return success message
    return NextResponse.json(
      { message: "Pomyślnie utworzono nowe konto", user },
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
  const data = await req.json();

  try {
    Session();

    // user not exist
    const username = data.username.toLowerCase();
    const existingUser = await db.users.findUnique({ where: { username } });

    if (!existingUser) {
      return NextResponse.json(
        { message: "Nie znaleziono konta użytkownika" },
        { status: 400 }
      );
    }

    // delete user comments
    const comments = await db.comments.deleteMany({
      where: { author: username },
    });

    // delete comments under user posts
    const userPosts = await db.posts.findMany({ where: { author: username } });

    for (const post of userPosts) {
      await db.comments.deleteMany({ where: { postId: post.id } });
    }

    // delete user posts
    const posts = await db.posts.deleteMany({ where: { author: username } });

    // delete user account
    const { password: _, ...user } = await db.users.delete({
      where: { username },
    });

    return NextResponse.json(
      { message: "Pomyślnie usunięto konto", comments, posts, user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Wystąpił nieoczekiwany błąd serwera", error },
      { status: 500 }
    );
  }
}
