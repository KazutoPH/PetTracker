// import CustomButton from "@/component/Button/CustomButton";
import Register from "@/components/forms/Register";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const session = await getServerSession();

  if (session) {
    redirect(`/profile`);
  }

  return (
    <main className=" flex flex-1 justify-center items-center h-screen padding-container">
      <Register />
    </main>
  );
};

export default Page;
