"use client";
import Image from "next/image";
import React from "react";
import { signOut, signIn  } from "next-auth/react";

const Navbar = () => {
  return (
    <main className="w-full absolute">
      <div className="max_width flex flex-row justify-between">
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
