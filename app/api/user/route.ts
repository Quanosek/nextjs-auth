import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import db from "@/lib/db";
import { auth } from "@/lib/auth";

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

    const password = await hash(body.password, 12); // secure password value

    // create new user
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
    // only logged-in user authentication
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { message: "Nieuprawniony dostęp" },
        { status: 401 }
      );
    }

    const username = body.username.toLowerCase();
    const existingUser = await db.user.findUnique({ where: { username } });

    // user not found error
    if (!existingUser) {
      return NextResponse.json(
        { message: "Nie znaleziono konta użytkownika" },
        { status: 400 }
      );
    }

    // delete user
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
