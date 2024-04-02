import PetCard from "@/components/cards/PetCard";
import UserProfileCard from "@/components/cards/UserProfileCard";
import { getPetInfo } from "@/lib/actions/user.action";
import React from "react";

const PetDetails = async ({ id }: { id: string }) => {
  const pet_info = await getPetInfo(id);

  if (!pet_info) return;

  return (
    <div className=" flex flex-col w-full gap-10 max-w-[700px]">
      <div className="flex flex-1">
        <PetCard id={id} pet={pet_info} key={pet_info._id} edit={false} />
      </div>

      <div className="flex flex-1">
        <UserProfileCard
          user={pet_info.owner}
          custom_style="w-full"
          edit={false}
        />
      </div>
    </div>
  );
};

export default PetDetails;
