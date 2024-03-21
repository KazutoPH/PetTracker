import Image from "next/image";
import { getServerSession } from "next-auth";

export default function Home() {
  currentSession();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
    </main>
  );
}

export async function currentSession() {
  const session = await getServerSession();
  console.log(session);
}
