import { NextResponse } from "next/server";
import db from "@/lib/db";
import { compare, hash } from "bcrypt";
import Session from "@/lib/api/session";

export async function POST(req: Request) {
  const { user, currentPassword, newPassword } = await req.json();

  try {
    Session();

    // user not exist
    const username = user.username.toLowerCase();
    const existingUser = await db.users.findUnique({ where: { username } });

    if (!existingUser) {
      return NextResponse.json(
        { message: "Nie znaleziono konta użytkownika" },
        { status: 400 }
      );
    }

    // incorrect current password
    const passwordMatch = await compare(currentPassword, existingUser.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Podano niepoprawne obecnie używane hasło" },
        { status: 409 }
      );
    }

    // secure new password
    const hashedPassword = await hash(newPassword, 12);

    const { password: _, ...updatedUser } = await db.users.update({
      where: { username },
      data: { password: hashedPassword },
    });

    return NextResponse.json(
      { message: "Twoje hasło zostało zmienione", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Wystąpił nieoczekiwany błąd serwera", error },
      { status: 500 }
    );
  }
}
