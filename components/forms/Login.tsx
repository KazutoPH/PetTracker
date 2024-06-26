"use client";

import { logInUser } from "@/lib/actions/user.action";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa6";
import { FaLock } from "react-icons/fa6";
import LoadingSpiner from "../LoadingSpiner";

const Login = () => {
  const [errorText, seterrorText] = useState<any>();
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setisLoading(true);
    const formData = new FormData(e.currentTarget);

    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      seterrorText("Wrong Email or Password");
      setisLoading(false);
    } else router.push("/profile");
    console.log(res);
  };

  return (
    <div className="regiter_form_container">
      <div className="p-2 w-full">
        <h1 className=" text-2xl font-bold text-primary">PetTracker</h1>
        <div className="flex flex-col items-center justify-center my-5 w-full">
          <h1 className="text-3xl font-bold text-black">Sign-in to Account</h1>

          <form onSubmit={handleSubmit} className="mt-5 w-full">
            <div className="flex flex-col gap-3 w-full">
              <div className="flex flex-row login_input_container w-full">
                <FaEnvelope size={20} color="black" />
                <input
                  name="email"
                  required
                  className="login_input w-full"
                  type="text"
                  placeholder="email"
                />
              </div>

              <div className="flex flex-row login_input_container">
                <FaLock size={20} color="black" />
                <input
                  name="password"
                  required
                  className="login_input w-full"
                  type="password"
                  placeholder="password"
                />
              </div>

              {errorText && (
                <div className=" w-full px-2 rounded-md">
                  <p className=" text-red-600 text-lg font-bold">{errorText}</p>
                </div>
              )}

              <button
                disabled={isLoading}
                className={`btnStyle ${isLoading && "!bg-primary/50"}`}
                type="submit"
              >
                {isLoading ? <LoadingSpiner size={28} /> : "Sign-In"}
              </button>
            </div>
          </form>

          <p className="text-black mt-5">
            Dont have an account?{" "}
            <Link href={"/auth/sign-up"} className=" text-primary">
              Register
            </Link>
          </p>
          <p className="text-black">or</p>
          <div className="w-full mt-2">
            <button
              onClick={() => signIn("google", { callbackUrl: "/profile" })}
              className="btnStyle w-full"
              type="submit"
            >
              Sign-In Via Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
