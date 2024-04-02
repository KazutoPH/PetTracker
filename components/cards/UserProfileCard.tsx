"use server";

import { getUser } from "@/lib/actions/user.action";
import { UserType } from "@/types";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import { IoIosPerson } from "react-icons/io";
import { FaPenToSquare } from "react-icons/fa6";
import RouteButton from "../button/RouteButton";

const UserProfileCard = async ({
  user,
  custom_style,
  edit,
  title,
}: {
  user: UserType;
  custom_style?: string;
  edit: boolean;
  title?: boolean;
}) => {
  return (
    <div
      className={`flex flex-col bg-white p-5 lg:p-10 rounded-md shadow-lg relative ${custom_style}`}
    >
      <p className=" flex self-center clas text-2xl font-bold">Owner Details</p>
      {edit && (
        <div className="absolute top-5 right-5">
          <RouteButton
            route={"editProfile=true"}
            icon={<FaPenToSquare size={30} color="#c46316" />}
          />
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-5 items-center">
        <div className="relative h-[120px] w-[120px] rounded-full border-2 border-primary flex overflow-hidden">
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

        <div className="flex flex-col items-center sm:items-start text-center sm:text-start">
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
