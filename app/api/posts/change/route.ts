import { NextResponse } from "next/server";
import db from "@/lib/db";
import Session from "@/lib/api/session";

export async function POST(req: Request) {
  const { id, title, content } = await req.json();

  try {
    Session();

    // update post
    const post = await db.posts.update({
      where: { id },
      data: { title, content },
    });

    return NextResponse.json(
      { message: "Post został zaktualizowany", post },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Wystąpił nieoczekiwany błąd serwera", error },
      { status: 500 }
    );
  }
}
