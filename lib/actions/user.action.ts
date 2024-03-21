"use server";
import { redirect } from "next/navigation";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import bcrypt, { hash } from "bcrypt";

export async function userExist(email: string) {
  connectToDB();
  try {
    const user = await User.findOne({ email: email });
    if (user) return true;
    else false;
  } catch (error) {
    return error;
  }
}

export async function createUser({
  userinfo,
}: {
  userinfo: {
    fullname: string;
    email: string;
    password: string;
  };
}) {
  connectToDB();
  const hashpassword = await hash(userinfo.password, 10);

  try {
    const user = userExist(userinfo.email);

    if (!user) {
      const create_user = await User.create({
        fullname: userinfo.fullname,
        email: userinfo.email,
        password: hashpassword,
      });
      console.log(create_user);
      return "sucess";
    } else return "user exist";
  } catch (error) {
    throw error;
  }
}

//user log in function
export async function logInUser({
  userinfo,
}: {
  userinfo: {
    email: string;
    password: string;
  };
}) {
  connectToDB();

  try {
    const get_user = await User.findOne({ email: userinfo.email });
    if (get_user) {
      const correctpassword = await bcrypt.compare(
        userinfo.password,
        get_user.password
      );
      if (correctpassword) {
        redirect("/");
      } else return "wrong email or password";
    } else return "wrong email or password";
  } catch (error) {
    throw error;
  }
}
