import AddCard from "@/components/cards/AddCard";
import PetCard from "@/components/cards/PetCard";
import React from "react";

function Profile() {
  return (
    <div className=" max_width flex flex-col gap-5 pb-20">
      <div className=" flex flex-col custom_margin bg-white padding-container rounded-md shadow-lg">
        <div className="flex flex-row gap-5 items-center">
          <div className="h-[100px] w-[100px] bg-red-400 rounded-full border-2 border-primary"></div>

          <div className="flex flex-col">
            <p className=" text-2xl font-bold leading-none">Raymart Gomez</p>
            <p className=" text-lg text-black/60 font-medium">
              raymartgomez@gmail.com
            </p>
          </div>
        </div>
      </div>

      <div className="w-full">
        <p className=" text-2xl font-bold py-2">My Pets</p>
        <PetList />
      </div>
    </div>
  );
}

const PetList = () => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(500px,1fr))] grid-flow-dense gap-10">
      <PetCard />
      <PetCard />
      <PetCard />
      <AddCard />
    </div>
  );
};

export default Profile;
