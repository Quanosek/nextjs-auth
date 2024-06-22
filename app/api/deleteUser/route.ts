import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function DELETE(req: Request) {
  const body = await req.json();
  const id = body.id;

  // id not provided error
  if (!id) {
    return NextResponse.json(
      {
        message: "ID is required",
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
        message: "User deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    // return error message
    return NextResponse.json(
      {
        message: "An error occurred while deleting the user",
        error,
      },
      { status: 500 }
    );
  }
}
