import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import db from "@/lib/db";
import { registerUserSchema } from "@/lib/user-schema";

export async function POST(req: Request) {
  try {
    // get request body
    const body = await req.json();
    const username = registerUserSchema.parse(body).username.toLowerCase();

    // check existing user
    const existingUser = await db.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          user: null,
          message: "Podany login jest zajęty",
        },
        { status: 409 }
      );
    }

    // define new user without public password
    const password = await hash(body.password, 12);

    const newUser = await db.user.create({
      data: { username, password },
    });

    const { password: _, ...user } = newUser;

    // return new user data
    return NextResponse.json(
      {
        user,
        message: "Pomyślnie utworzono nowe konto",
      },
      { status: 201 }
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
