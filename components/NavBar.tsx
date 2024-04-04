"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { signOut, signIn, useSession, SessionProvider } from "next-auth/react";
import { navList } from "../constants/index";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, stagger } from "framer-motion";
import {
  menuVariant,
  navListContainer,
  navlistAnimate,
} from "../constants/framervariants";

const Navbar = () => {
  return (
    <SessionProvider>
      <NavbarContent />
    </SessionProvider>
  );
};

const NavbarContent = () => {
  const [showNav, setshowNav] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (showNav) {
      document.body.style.overflow = "hidden";
    } else document.body.style.overflow = "auto";
  }, [showNav]);

  useEffect(() => {
    const handleResize = () => {};

    window.addEventListener("resize", (e) => {
      if (window.innerWidth > 1024) document.body.style.overflow = "auto";
      else if (showNav && window.innerWidth < 1024)
        document.body.style.overflow = "hidden";
    });
    return () => {
      window.removeEventListener("scroll", handleResize);
    };
  }, []);

  return (
    <main className="w-full absolute top-0">
      <div className="max_width flex flex-row justify-between items-center py-5 px-[5%] md:px-20">
        <Link href="/">
          <div className="flex flex-row items-center gap-5">
            <div className="relative h-[55px] w-[55px]">
              <Image
                src="/logo.png"
                alt="logo"
                fill
                className="object-contain"
              />
            </div>
            <p className=" text-primary text-3xl font-bold">PetTracker</p>
          </div>
        </Link>

        <div className=" relative flex-row items-center gap-5 hidden lg:flex">
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

        <div
          className="relative w-[32px] h-[25px] z-40 inline-block cursor-pointer lg:hidden"
          onClick={() => setshowNav(!showNav)}
        >
          <motion.div
            animate={
              showNav
                ? { rotate: -45, top: "50%", translateY: "-50%" }
                : { rotate: 0, top: 0 }
            }
            transition={{ duration: 0.2 }}
            className={` w-full bg-primary h-1 absolute rounded-md  duration-500`}
          />
          <motion.div
            animate={showNav ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.4 }}
            className={`bg-primary
            } w-full h-1 absolute top-1/2 -translate-y-1/2 rounded-md`}
          />
          <motion.div
            animate={
              showNav
                ? { rotate: 45, bottom: "50%", translateY: "50%" }
                : { rotate: 0, bottom: 0 }
            }
            transition={{ duration: 0.2 }}
            className={`bg-primary
            } w-full h-1 absolute rounded-md duration-500`}
          />
        </div>

        {/* sideNav */}
        <AnimatePresence>
          {showNav && (
            <motion.div
              variants={menuVariant}
              initial="initial"
              animate="animate"
              exit="exit"
              className="z-10 lg:hidden bg-white fixed right-0 top-0 w-full h-full flex justify-end  overflow-hidden rounded-bl-full"
            >
              <div className="flex flex-1 bg-primary/5 max-h-screen max-w-[100vw] justify-center items-center">
                <motion.ul
                  variants={navListContainer}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className=" flex flex-col justify-center gap-[7%] h-full flex-1 items-center"
                >
                  {showNav &&
                    navList.map((link) => (
                      <motion.li
                        whileHover={{
                          scale: 1.1,
                          transition: { duration: 0.2 },
                        }}
                        whileTap={{ scale: 0.9, transition: { duration: 0.2 } }}
                        variants={navlistAnimate}
                        className="text-white relative group flex items-center justify-center"
                        key={link.name}
                        onClick={() => setshowNav(!showNav)}
                      >
                        <Link
                          href={link.link}
                          className="text-3xl font-extrabold text-black"
                        >
                          {link.name}
                        </Link>

                        <div className=" group-hover:max-w-full w-full absolute -bottom-2 h-1 bg-primary max-w-0 transition-all duration-300" />
                      </motion.li>
                    ))}

                  {session ? (
                    <motion.li
                      whileHover={{
                        scale: 1.1,
                        transition: { duration: 0.2 },
                      }}
                      whileTap={{ scale: 0.9, transition: { duration: 0.2 } }}
                      variants={navlistAnimate}
                      className=" w-[200px] text-white relative group flex items-center justify-center"
                      onClick={() => setshowNav(!showNav)}
                    >
                      <button
                        onClick={() =>
                          signOut({ callbackUrl: "/auth/sign-in" })
                        }
                        className="navBtnStyle w-full"
                        type="submit"
                      >
                        Sign-Out
                      </button>
                    </motion.li>
                  ) : (
                    <motion.li
                      whileHover={{
                        scale: 1.1,
                        transition: { duration: 0.2 },
                      }}
                      whileTap={{ scale: 0.9, transition: { duration: 0.2 } }}
                      variants={navlistAnimate}
                      className=" w-[200px] text-white relative group flex items-center justify-center"
                      onClick={() => setshowNav(!showNav)}
                    >
                      <button
                        onClick={() => router.push("/auth/sign-in")}
                        className="navBtnStyle w-full"
                        type="submit"
                      >
                        Sign-In
                      </button>
                    </motion.li>
                  )}
                </motion.ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default Navbar;
