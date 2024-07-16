import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import db from "@/lib/db";

export async function POST(req: Request) {
  const { id, title, content } = await req.json();

  try {
    // only logged-in user authentication
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { message: "Nieuprawniony dostęp" },
        { status: 401 }
      );
    }

    // update post
    await db.posts.update({
      where: { id },
      data: { title, content },
    });

    // return success message
    return NextResponse.json(
      { message: "Post został zaktualizowany" },
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
