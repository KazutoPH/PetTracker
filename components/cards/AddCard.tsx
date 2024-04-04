"use client";

import React from "react";
import { FaPlus } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import { useContextProvider } from "@/context/ContextProvider";

function AddCard() {
  const { setModal } = useContextProvider()
  return (
    <button
      onClick={() => setModal('addPet')
      }
      className="flex flex-col bg-white p-5 rounded-md w-full shadow-md items-center justify-center relative"
    >
      <div className="flex items-center justify-center flex-col gap-5">
        <FaPlus size={50} />
        <p className=" text-2xl  text-black font-bold">Add Pet</p>
      </div>
    </button>
  );
}

export default AddCard;
