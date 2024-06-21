"use client";

import { useRouter } from "next/navigation";

import { useSession } from "next-auth/react";

export default function ClientPage() {
  const router = useRouter();

  const { data } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });

  const user = data?.user;

  return (
    <main>
      <h1>Klient</h1>

      <div>
        {!user ? (
          <p>Ładowanie...</p>
        ) : (
          <>
            <p>ID: {user.id}</p>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </>
        )}
      </div>
    </main>
  );
}
