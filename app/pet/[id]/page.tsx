import React from "react";
import PetDetails from "./petdetails";

const page = async ({ params }: { params: { id: string } }) => {
  return (
    <div className=" max_width flex flex-col padding-container custom_margin gap-5 items-center">
      <PetDetails id={params.id} />
    </div>
  );
};

export default page;
