"use server";
import { redirect } from "next/navigation";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import bcrypt, { hash } from "bcrypt";
import { NextResponse } from "next/server";
import Pet from "../models/pet.model";
import QRCode from "qrcode";
import { revalidatePath } from "next/cache";

export async function getUser(email: string) {
  connectToDB();
  try {
    const user = await User.findOne({ email: email });
    return JSON.parse(JSON.stringify(user));
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
    const user = await getUser(userinfo.email);

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

export async function updateUserInfo({
  userinfo,
}: {
  userinfo: {
    email: string;
    image: string;
    fullname: string;
    contact: string;
    address: string;
  };
}) {
  connectToDB();
  try {
    await User.findOneAndUpdate(
      { email: userinfo.email },
      {
        fullname: userinfo.fullname,
        image: userinfo.image,
        contact: userinfo.contact,
        address: userinfo.address,
        onboarding: true,
      },
      {
        upsert: true,
      }
    );

    return { sucess: true };
  } catch (error) {
    return { sucess: false };
  }
}

export async function createPet({
  petDetails,
}: {
  petDetails: {
    owner: string;
    name: string;
    breed: string;
    date_of_birth: FormDataEntryValue | null;
    gender: string;
    color: string | null;
    image: string;
  };
}) {
  connectToDB();

  try {
    const pet = await Pet.create({
      owner: petDetails.owner,
      name: petDetails.name,
      breed: petDetails.breed,
      date_of_birth: petDetails.date_of_birth,
      gender: petDetails.gender,
      color: petDetails.color,
      image: petDetails.image,
    });

    if (pet) {
      const updateUser = await User.findByIdAndUpdate(petDetails.owner, {
        $push: { pets: petDetails.owner },
      });
      const qr = await QRCode.toDataURL(`http://localhost:3000/pet/${pet._id}`);
      const updatePet = await Pet.findByIdAndUpdate(pet._id, {
        qr: qr,
      });
    }
    revalidatePath("/profile");
  } catch (error) {
    console.log(error);
  }
}

export async function getPets(id: string) {
  connectToDB();
  try {
    const pets = await Pet.find({ owner: id });
    return JSON.parse(JSON.stringify(pets));
  } catch (error) {
    return error;
  }
}
