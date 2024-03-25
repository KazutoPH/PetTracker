"use client";

import { createPet } from "@/lib/actions/user.action";
import { UserType } from "@/types";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import LoadingSpiner from "../LoadingSpiner";
import { useRouter, useSearchParams } from "next/navigation";

const Addpet = ({ id }: { id: string }) => {
  const [errorText, seterrorText] = useState<any>();
  const ref = useRef<HTMLInputElement>(null);
  const [showImage, setShowImage] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing("media");
  const [isLoading, setisLoading] = useState(false);
  const [gender, setGender] = useState("Male");
  const [showGender, setShowGender] = useState(false);
  const [showForm, setshowForm] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const addPetParams = searchParams.get("addPet");

  useEffect(() => {
    if (addPetParams) setshowForm(true);
    else setshowForm(false);
  }, [addPetParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("submit click");
    let uploadURL: string = "";
    e.preventDefault();
    setisLoading(true);

    const formData = new FormData(e.currentTarget);

    if (showImage !== "") {
      const imgRes = await startUpload(files);
      if (imgRes && imgRes[0].url) {
        uploadURL = imgRes[0].url;
        console.log(uploadURL);
      }
    }

    console.log(files);
    const petDetails = {
      owner: id,
      name: formData.get("name")?.toString() || "",
      breed: formData.get("breed")?.toString() || "",
      date_of_birth: formData.get("date_of_birth")?.toString() || "",
      gender: gender,
      color: formData.get("color")?.toString() || "",
      image: uploadURL,
    };

    const res = await createPet({ petDetails });
    setisLoading(false);

    router.push("/profile");
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const fileReader = new FileReader();

    // check if image selected
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      console.log("size is: ", Math.round(file.size / 1024));
      if (Math.round(file.size / 1024) > 4096) {
        alert("image must be less than 4mb");
        return;
      }

      // set selected image to files refer to const = files
      setFiles(Array.from(e.target.files));

      // if file is not image abort function
      if (!file.type.includes("image")) return;

      // get string value of image
      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";

        // change image on form display
        setShowImage(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  return (
    <>
      {showForm && (
        <div className="darkbg">
          <div className="regiter_form_container">
            <div className=" w-full">
              <div className="flex flex-col items-center justify-center my-5 w-full">
                <h1 className="text-3xl font-bold text-black">
                  Create Profile
                </h1>

                <form onSubmit={(e) => handleSubmit(e)} className="mt-5 w-full">
                  <div className="flex flex-col gap-3 w-full">
                    <div className="flex flex-col gap-2">
                      <div className="relative h-[100px] w-[100px] self-center border border-[#d3d3d3] rounded-full overflow-hidden">
                        {showImage ? (
                          <Image
                            src={showImage}
                            alt="upload"
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            priority
                            className="object-cover"
                          />
                        ) : null}
                      </div>
                      <div className="flex relative overflow-hidden w-full">
                        <button
                          type="button"
                          onClick={() => {
                            if (showImage !== "") {
                              setShowImage(""), setFiles([]);
                            } else {
                              if (ref.current) ref.current.click();
                            }
                          }}
                          className="btnStyle w-full"
                        >
                          {`${
                            showImage !== "" ? "Remove Image" : "Upload Image"
                          }`}
                        </button>
                        <input
                          name="uploadImage"
                          id="uploadImage"
                          ref={ref}
                          onChange={(e) => handleImage(e)}
                          type="file"
                          accept="image/*"
                          className="absolute w-full h-full opacity-0 hidden"
                        />
                      </div>
                    </div>
                    <div className="input_with_label w-full">
                      <p className="input_label">Name</p>
                      <input
                        required
                        name="name"
                        type="text"
                        className="sign_up_input"
                        placeholder="Name"
                      />
                    </div>

                    <div className="input_with_label">
                      <p className="input_label">Breed</p>
                      <input
                        required
                        name="breed"
                        className="sign_up_input"
                        placeholder="Breed"
                      />
                    </div>

                    <div className="flex flex-row gap-2 relative">
                      <div className="input_with_label">
                        <p className="input_label w-full">Date of Birth</p>
                        <input
                          required
                          name="date_of_birth"
                          type="date"
                          className="sign_up_input"
                          placeholder="Contact"
                        />
                      </div>

                      <div className="input_with_label w-full">
                        <p className="input_label">Gender</p>
                        <div
                          className="relative w-full"
                          onClick={() => setShowGender(!showGender)}
                        >
                          <div className="sign_up_input w-full h-[37px]">
                            {gender}
                          </div>
                          {showGender && (
                            <div className="absolute top-[32px] w-full z-20 bg-white border-b-2 border-l-2 border-r-2 border-black/30">
                              <p
                                className=" px-2 text-base text-black w-full hover:bg-primary hover:text-white"
                                onClick={() => setGender("Male")}
                              >
                                Male
                              </p>
                              <p
                                className=" px-2 text-base text-black w-full hover:bg-primary hover:text-white"
                                onClick={() => setGender("Female")}
                              >
                                Female
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="input_with_label">
                      <p className="input_label">Color</p>
                      <input
                        required
                        minLength={3}
                        name="color"
                        type="text"
                        className="sign_up_input"
                        placeholder="Color"
                      />
                    </div>
                  </div>

                  {errorText && (
                    <div className=" w-full mt-5 px-2 rounded-md">
                      <p className=" text-red-600 text-lg font-bold">
                        {errorText}
                      </p>
                    </div>
                  )}

                  <div className="w-full mt-5">
                    <button className="btnStyle w-full" type="submit">
                      Add Pet
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Addpet;
