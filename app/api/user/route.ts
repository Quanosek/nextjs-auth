import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import db from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const username = body.username.toLowerCase();
    const existingUser = await db.user.findUnique({ where: { username } });

    // user already exists error
    if (existingUser) {
      return NextResponse.json(
        { message: "Podana nazwa użytkownika jest już zajęta" },
        { status: 409 }
      );
    }

    // secure password value
    const password = await hash(body.password, 12);
    const newUser = await db.user.create({
      data: { username, password },
    });

    const { password: _, ...user } = newUser;

    // return success message
    return NextResponse.json(
      { message: "Pomyślnie utworzono nowe konto", user },
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
  const body = await req.json();

  try {
    const username = body.username.toLowerCase();
    const existingUser = await db.user.findUnique({ where: { username } });

    if (!existingUser) {
      return NextResponse.json(
        { message: "Nie znaleziono konta użytkownika" },
        { status: 400 }
      );
    }

    // delete user from db
    await db.user.delete({ where: { username } });

    // return success message
    return NextResponse.json(
      { message: "Pomyślnie usunięto konto" },
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
