"use client";
import Image from "next/image";
import React from "react";
import { signOut, signIn } from "next-auth/react";

const Navbar = () => {
  return (
    <main className="w-full absolute top-0">
      <div className="max_width flex flex-row justify-between items-center py-5">
        <div className="flex flex-row items-center gap-5">
          <div className="relative h-[70px] w-[70px]">
            <Image src="/logo.png" alt="logo" fill className="object-contain" />
          </div>
          <p className=" text-primary text-3xl font-bold">PetTracker</p>
        </div>
        <div className=" relative flex flex-row items-center">
          <button
            onClick={() => signOut({ callbackUrl: "/auth/sign-in" })}
            className="btnStyle w-full"
            type="submit"
          >
            Sign-Out
          </button>
        </div>
      </div>
    </main>
  );
};

export default Navbar;
