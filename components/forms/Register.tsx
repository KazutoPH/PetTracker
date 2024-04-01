"use client";

import { createUser } from "@/lib/actions/user.action";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import LoadingSpiner from "../LoadingSpiner";

const Register = () => {
  const [errorText, seterrorText] = useState<any>();
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setisLoading(true);
    const formData = new FormData(e.currentTarget);
    const userinfo = {
      fullname: formData.get("fullname")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      password: formData.get("password")?.toString() || "",
    };

    const res = await createUser({ userinfo });
    if (res === "user exist") {
      seterrorText("user email already exist");
      setisLoading(false);
    } else {
      const id = res._id;
      const email = res.email;
      const fullname = res.fullname;
      seterrorText(null);
      const signInRes = await signIn("register-credentials", {
        id,
        email,
        fullname,
        redirect: false,
      });

      if (signInRes?.error) {
        seterrorText("there was an error signing in try again");
        setisLoading(false);
      } else router.push("/auth/onboarding");
      setisLoading(false);
    }
  };

  return (
    <div className="regiter_form_container">
      <div className=" w-full">
        <div className="flex flex-col items-center justify-center my-5 w-full">
          <h1 className="text-3xl font-bold text-black">Create an account</h1>

          <form onSubmit={(e) => handleSubmit(e)} className="mt-5 w-full">
            <div className="flex flex-col gap-3 w-full">
              <div className="input_with_label w-full">
                <p className="input_label">Full Name</p>
                <input
                  required
                  name="fullname"
                  type="text"
                  className="sign_up_input"
                  placeholder="Full Name"
                />
              </div>

              <div className="input_with_label">
                <p className="input_label">Email</p>
                <input
                  required
                  name="email"
                  type="email"
                  className="sign_up_input"
                  placeholder="Email"
                />
              </div>

              <div className="input_with_label">
                <p className="input_label">Password</p>
                <input
                  required
                  name="password"
                  type="password"
                  minLength={8}
                  className="sign_up_input"
                  placeholder="Password"
                />
              </div>
            </div>

            {errorText && (
              <div className=" w-full mt-5 px-2 rounded-md">
                <p className=" text-red-600 text-lg font-bold">{errorText}</p>
              </div>
            )}

            <div className="w-full mt-5">
              <button
                disabled={isLoading}
                className={`btnStyle w-full ${isLoading && "!bg-primary/50"}`}
                type="submit"
              >
                {isLoading ? <LoadingSpiner size={28} /> : "Register Account"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
