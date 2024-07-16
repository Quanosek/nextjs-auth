import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { compare, hash } from "bcrypt";

export async function POST(req: Request) {
  const { user, currentPassword, newPassword } = await req.json();

  try {
    // sign-in user authentication
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { message: "Nieuprawniony dostęp" },
        { status: 401 }
      );
    }

    const existingUser = await db.users.findUnique({ where: { id: user.id } });

    // user already exists error
    if (!existingUser) {
      return NextResponse.json(
        { message: "Nie znaleziono konta użytkownika" },
        { status: 400 }
      );
    }

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
    await db.users.update({
      where: { id: user.id },
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
