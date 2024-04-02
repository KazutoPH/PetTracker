import AddCard from "@/components/cards/AddCard";
import PetCard from "@/components/cards/PetCard";
import React from "react";
import { getServerSession } from "next-auth";
import { getPets, getUser } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import UserProfileCard from "@/components/cards/UserProfileCard";
import PetForm from "@/components/forms/Pet";
import { PetType } from "@/types";
import EditProfile from "@/components/formcontainer/EditProfile";

async function Profile() {
  const session = await getServerSession();
  console.log(session);
  if (!session || !session.user?.email) {
    redirect(`/auth/sign-in`);
  }

  const user = await getUser(session.user.email);

  if (!user) redirect(`/auth/sign-in`);

  if (!user.onboarding) redirect(`/auth/onboarding`);

  return (
    <div className=" max_width flex flex-col padding-container custom_margin gap-5">
      <UserProfileCard user={user} edit={true} />
      <div className="w-full">
        <p className=" text-2xl font-bold py-2">My Pets</p>
        <PetList id={user._id} />
      </div>

      <PetForm
        id={user._id}
        title={"Add Pet"}
        btnTitle={"Add Pet"}
        closeBtn={true}
        route={"addPet"}
      />

      <EditProfile user={user} />
    </div>
  );
}

const PetList = async ({ id }: { id: string }) => {
  const pets = await getPets(id);

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(auto,1fr))] md:grid-cols-[repeat(auto-fill,minmax(500px,1fr))] grid-flow-dense gap-10">
      {pets.map((pet: PetType) => (
        <PetCard id={id} pet={pet} key={pet._id} edit={true} />
      ))}
      <AddCard />
    </div>
  );
};

export default Profile;
