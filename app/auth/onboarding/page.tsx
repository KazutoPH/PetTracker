import Onboarding from "@/components/forms/Onboarding";
import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/actions/user.action";
import { UserType } from "@/types";

async function page() {
  const session = await getServerSession();
  if (!session) redirect("auth/sign-in");

  let user: UserType;
  if (session.user?.email) {
    user = await getUser(session.user.email);

    if (user) {
      if (user.onboarding) {
        redirect("/profile");
      }
    } else redirect("auth/sign-in");
  } else redirect("auth/sign-in");

  return (
    <main className="flex flex-1 justify-center items-center h-screen">
      <Onboarding user={user} />
    </main>
  );
}

export default page;
