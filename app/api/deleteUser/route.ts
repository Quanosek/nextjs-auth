import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function DELETE(req: Request) {
  const { id } = await req.json();

  // id not provided error
  if (!id) {
    return NextResponse.json(
      {
        message: "Nie podano ID użytkownika",
      },
      { status: 400 }
    );
  }

  try {
    // delete user from db
    await db.user.delete({ where: { id } });

    // return success message
    return NextResponse.json(
      {
        message: "Pomyślnie usunięto konto",
      },
      { status: 200 }
    );
  } catch (error) {
    // return error message
    return NextResponse.json(
      {
        message: "Wystąpił nieoczekiwany błąd",
        error,
      },
      { status: 500 }
    );
  }
}
