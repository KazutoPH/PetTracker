"use client";

import { deleteImage, updateUserInfo } from "@/lib/actions/user.action";
import { UserType } from "@/types";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import LoadingSpiner from "../LoadingSpiner";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaX } from "react-icons/fa6";
import { useContextProvider } from "@/context/ContextProvider";

const Onboarding = ({
  user,
  title,
  closeBtn,
  edit,
}: {
  user: UserType;
  title: string;
  closeBtn: boolean;
  edit?: boolean;
}) => {
  const { fullname, image, email } = user;
  const [errorText, seterrorText] = useState<any>();
  const ref = useRef<HTMLInputElement>(null);
  const [showImage, setShowImage] = useState(!user.image || user.image === '' ? '' : user.image);
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing("media");
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();
  const initialImage = user.image ? user.image : "";
  const { modal, setModal } = useContextProvider()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    let uploadURL: string = "";
    e.preventDefault();
    setisLoading(true);
    const formData = new FormData(e.currentTarget);

    if (showImage === "" && initialImage !== "") {
      const deleteImg = await deleteImage(initialImage);
    }

    if (showImage !== initialImage && showImage !== "") {
      if (files) {
        const deleteImg = await deleteImage(initialImage);
        const imgRes = await startUpload(files);
        if (imgRes && imgRes[0].url) {
          uploadURL = imgRes[0].url;
          console.log(uploadURL);
        }
      } else {
        uploadURL = initialImage;
      }
    } else {
      uploadURL = initialImage;
    }

    const userinfo = {
      email: user.email,
      fullname: formData.get("fullname")?.toString() || "",
      image: uploadURL,
      contact: formData.get("contact")?.toString() || "",
      address: formData.get("address")?.toString() || "",
    };

    const res = await updateUserInfo({ userinfo });
    setisLoading(false);

    if (res.sucess) {
      setModal('')
      router.refresh();
    }
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
    <div className="regiter_form_container relative">
      {closeBtn && (
        <FaX
          className="absolute top-5 right-5 hover:cursor-pointer"
          size={30}
          onClick={() => setModal('')}
        />
      )}

      <div className=" w-full">
        <div className="flex flex-col items-center justify-center my-5 w-full">
          <h1 className="text-3xl font-bold text-black">{title}</h1>

          <form onSubmit={(e) => handleSubmit(e)} className="mt-5 w-full">
            <div className="flex flex-col gap-3 w-full">
              <div className="flex flex-col gap-2">
                <div className="relative h-[120px] w-[120px] self-center border border-[#d3d3d3] rounded-full overflow-hidden">
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
                    disabled={isLoading}
                    className={`btnStyle w-full ${isLoading && "!bg-primary/50"
                      }`}
                  >
                    {`${showImage !== "" ? "Remove Image" : "Upload Image"}`}
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
                <p className="input_label">Full Name</p>
                <input
                  disabled={isLoading}
                  required
                  name="fullname"
                  type="text"
                  className="sign_up_input"
                  placeholder="Full Name"
                  defaultValue={fullname}
                />
              </div>

              <div className="input_with_label">
                <p className="input_label">Email</p>
                <input
                  disabled
                  required
                  name="email"
                  type="email"
                  className="sign_up_input"
                  placeholder="Email"
                  value={email}
                />
              </div>

              <div className="input_with_label">
                <p className="input_label">Contact No.</p>
                <input
                  disabled={isLoading}
                  required
                  minLength={8}
                  name="contact"
                  type="number"
                  defaultValue={user.contact ? user.contact : ""}
                  className="sign_up_input"
                  placeholder="Contact"
                />
              </div>

              <div className="input_with_label">
                <p className="input_label">Address</p>
                <input
                  disabled={isLoading}
                  required
                  minLength={5}
                  name="address"
                  type="text"
                  className="sign_up_input"
                  defaultValue={user.address ? user.address : ""}
                  placeholder="Address"
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
                {isLoading ? <LoadingSpiner size={28} /> : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
