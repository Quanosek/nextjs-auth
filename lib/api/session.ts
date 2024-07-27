import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import db from "@/lib/db";

export default async function Session() {
  const session = await auth();
  const id = session?.user?.id;
  const user = await db.users.findUnique({ where: { id } });

  //   logged in user with active session check
  if (!(session && user)) {
    return NextResponse.json(
      { message: "Nieuprawniony dostęp" },
      { status: 401 }
    );
  }
}
