import Login from "@/components/forms/Login";
import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getServerSession();

  if (session) {
    redirect(`/profile`);
  }

  return (
    <main className=" flex flex-1 justify-center items-center h-screen padding-container">
      <Login />
    </main>
  );
};

export default Page;
