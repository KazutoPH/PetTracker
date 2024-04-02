"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { signOut, signIn, useSession, SessionProvider } from "next-auth/react";
import { navList } from "../constants/index";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  return (
    <SessionProvider>
      <NavbarContent />
    </SessionProvider>
  );
};

const NavbarContent = () => {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <main className="w-full absolute top-0">
      <div className="max_width flex flex-row justify-between items-center py-5">
        <div className="flex flex-row items-center gap-5">
          <div className="relative h-[55px] w-[55px]">
            <Image src="/logo.png" alt="logo" fill className="object-contain" />
          </div>
          <p className=" text-primary text-3xl font-bold">PetTracker</p>
        </div>
        <div className=" relative flex flex-row items-center gap-5">
          <ul className="flex flex-row gap-5 items-center">
            {navList.map((nav, i) => (
              <Link href={nav.link} key={i}>
                <li className="hover:cursor-pointer">
                  <p className="text-black font-semibold text-[22px]">
                    {nav.name}
                  </p>
                </li>
              </Link>
            ))}
          </ul>

          {session ? (
            <button
              onClick={() => signOut({ callbackUrl: "/auth/sign-in" })}
              className="btnStyle w-full"
              type="submit"
            >
              Sign-Out
            </button>
          ) : (
            <button
              onClick={() => router.push("/auth/sign-in")}
              className="btnStyle w-full"
              type="submit"
            >
              Sign-In
            </button>
          )}
        </div>
      </div>
    </main>
  );
};

export default Navbar;
