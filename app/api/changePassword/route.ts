import { NextResponse } from "next/server";
import { compare, hash } from "bcrypt";
import db from "@/lib/db";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
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

    // user already exists error
    if (!existingUser) {
      return NextResponse.json(
        { message: "Nie znaleziono konta użytkownika" },
        { status: 400 }
      );
    }

    const { currentPassword, newPassword } = body;

    // incorrect current password error
    const passwordMatch = await compare(currentPassword, existingUser.password);
    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Podano niepoprawne obecnie używane hasło" },
        { status: 409 }
      );
    }

    // secure new password value
    const hashedPassword = await hash(newPassword, 12);
    await db.user.update({
      where: { username },
      data: { password: hashedPassword },
    });

    // return success message
    return NextResponse.json(
      { message: "Twoje hasło zostało zmienione" },
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
