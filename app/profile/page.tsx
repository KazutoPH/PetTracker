import AddCard from "@/components/cards/AddCard";
import PetCard from "@/components/cards/PetCard";
import React from "react";
import { getServerSession } from "next-auth";
import { getUser } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import UserProfileCard from "@/components/cards/UserProfileCard";
import AddPet from "@/components/forms/AddPet";
import Addpet from "@/components/forms/AddPet";

async function Profile() {
  const session = await getServerSession();
  if (!session || !session.user?.email) {
    redirect(`/auth/sign-in`);
  }

  const user = await getUser(session.user.email);

  if (!user) redirect(`/auth/sign-in`);

  if (!user.onboarding) redirect(`/auth/onboarding`);

  return (
    <div className=" max_width flex flex-col gap-5 pb-20">
      <UserProfileCard user={user} />
      <div className="w-full">
        <p className=" text-2xl font-bold py-2">My Pets</p>
        <PetList id={user._id} />
      </div>
      <AddPet id={user._id} />
    </div>
  );
}

const PetList = async ({ id }: { id: string }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(500px,1fr))] grid-flow-dense gap-10">
      <PetCard />

      <AddCard />
    </div>
  );
};

export default Profile;
