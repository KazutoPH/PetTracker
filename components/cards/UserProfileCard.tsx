import { getUser } from "@/lib/actions/user.action";
import { UserType } from "@/types";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import { IoIosPerson } from "react-icons/io";

const UserProfileCard = async ({ user }: { user: UserType }) => {
  return (
    <div className=" flex flex-col custom_margin bg-white padding-container rounded-md shadow-lg">
      <div className="flex flex-row gap-5 items-center">
        <div className="relative h-[100px] w-[100px] rounded-full border-2 border-primary flex overflow-hidden">
          {user.image === "" ? (
            <div>
              <IoIosPerson
                size={"120%"}
                className=" absolute left-1/2 -translate-x-1/2 top-0"
                color="#c46316"
              />
            </div>
          ) : (
            <Image
              src={`${user.image}`}
              alt="profile"
              fill
              className="object-cover"
            />
          )}
        </div>

        <div className="flex flex-col">
          <p className=" text-2xl font-bold leading-none">{user.fullname}</p>
          <p className=" text-base text-black/60 font-medium">{user.email}</p>
          <p className=" text-base text-black/60 font-medium">{user.contact}</p>
          <p className=" text-base text-black/60 font-medium">{user.address}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
