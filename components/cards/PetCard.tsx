import Image from "next/image";
import React from "react";

const PetCard = () => {
  return (
    <div className="flex flex-col bg-white p-5 rounded-md w-full shadow-md gap-5 relative">
      <p className=" flex self-center clas text-2xl font-bold">
        Pet Identification
      </p>
      <div className="flex flex-row gap-5">
        <div className="flex flex-col items-center max-h-fit">
          <div className="pet_img_container">
            <Image src="/dog.webp" alt="photo" fill className="object-cover" />
          </div>

          <p className=" text-xl font-bold">KOTARO</p>
        </div>

        <div className="flex flex-row gap-5 w-full">
          <div className="flex flex-col gap-3 flex-1">
            <div className="flex flex-col">
              <p className="pet_detail_title">Breed</p>
              <p className="pet_detail">Shit Tzu</p>
            </div>
            <div className="flex flex-col">
              <p className="pet_detail_title">Sex</p>
              <p className="pet_detail">Male</p>
            </div>

            <div className="flex flex-col">
              <p className="pet_detail_title">Color</p>
              <p className="pet_detail">Brown and White</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 flex-1">
            <div className="flex flex-col">
              <p className="pet_detail_title">Date of Birth</p>
              <p className="pet_detail">03/10/2000</p>
            </div>
            <div className="flex flex-col">
              <p className="pet_detail_title">Age</p>
              <p className="pet_detail">2 Years Old</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <button className="btnStyle">Download QR</button>
      </div>

      <div className=" absolute  bottom-5 right-5 h-[100px] w-[100px]">
        <Image src="/qr.webp" alt="qr" fill className="object-contain" />
      </div>
    </div>
  );
};

export default PetCard;
