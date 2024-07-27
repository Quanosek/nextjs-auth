import { NextResponse } from "next/server";
import db from "@/lib/db";
import Session from "@/lib/api/session";

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

    // new comment
    const comment = await db.comments.create({ data });

    return NextResponse.json(
      { message: "Pomyślnie dodano nowy komentarz", comment },
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

    // delete comment
    const comment = await db.comments.delete({ where: { id } });

    return NextResponse.json(
      { message: "Pomyślnie usunięto komentarz", comment },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Wystąpił nieoczekiwany błąd serwera", error },
      { status: 500 }
    );
  }
}
