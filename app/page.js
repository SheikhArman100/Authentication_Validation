"use client";

import {signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const {data:session} = useSession();
  const router=useRouter()
  console.log(session)

  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
       
          
        
      {session? (
        <button
          className="bg-red-500 px-4 py-2  text-white"
          onClick={() =>signOut() }
        >
          Sign out
        </button>
      ) : (
        <button
          className="bg-red-500 px-4 py-2  text-white"
          onClick={() => router.push("/signin")}
        >
          Sign in
        </button>
      )} 

      <h2>{session?.user.email}</h2>
      <h2></h2>
    </main>
  );
}
