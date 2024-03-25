"use client";

import Image from "next/image";
import React from "react";
import { saveAs } from "file-saver";
import { PetType } from "@/types";
import moment from "moment";

const PetCard = ({ pet }: { pet: PetType }) => {
  const startDateObj = new Date(pet.date_of_birth);
  const endDateObj = new Date();
  const yearDiff = endDateObj.getFullYear() - startDateObj.getFullYear();
  const monthDiff = endDateObj.getMonth() - startDateObj.getMonth();

  return (
    <div className="flex flex-col bg-white p-5 rounded-md w-full shadow-md gap-5 relative">
      <p className=" flex self-center clas text-2xl font-bold">
        Pet Identification
      </p>
      <div className="flex flex-row gap-5">
        <div className="flex flex-col items-center max-h-fit">
          <div className="pet_img_container">
            <Image
              src={pet.image}
              unoptimized
              alt="photo"
              fill
              className="object-cover"
            />
          </div>

          <p className=" text-xl font-bold">{pet.name}</p>
        </div>

        <div className="flex flex-row gap-5 w-full">
          <div className="flex flex-col gap-3 flex-1">
            <div className="flex flex-col">
              <p className="pet_detail_title">Breed</p>
              <p className="pet_detail">{pet.breed}</p>
            </div>
            <div className="flex flex-col">
              <p className="pet_detail_title">Sex</p>
              <p className="pet_detail">{pet.gender}</p>
            </div>

            <div className="flex flex-col">
              <p className="pet_detail_title">Color</p>
              <p className="pet_detail">{pet.color}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 flex-1">
            <div className="flex flex-col">
              <p className="pet_detail_title">Date of Birth</p>
              <p className="pet_detail">
                {moment(pet.date_of_birth).format("MM/DD/YYYY")}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="pet_detail_title">Age</p>
              <p className="pet_detail">
                {yearDiff > 0 && (
                  <>
                    {yearDiff === 1 ? `${yearDiff} year` : `${yearDiff} years`}
                  </>
                )}
                {monthDiff > 0 ? (
                  <>
                    {monthDiff === 1
                      ? `${yearDiff} month`
                      : `${monthDiff} months`}
                  </>
                ) : (
                  yearDiff === 0 && "1 month"
                )}
                &nbsp;old
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <button
          className="btnStyle"
          onClick={() => {
            const qr = pet.qr;
            saveAs(`${qr}`, "qr.jpg");
          }}
        >
          Download QR
        </button>
      </div>

      <div className=" absolute  bottom-5 right-5 h-[100px] w-[100px]">
        <Image src={pet.qr} alt="qr" fill className="object-contain" />
      </div>
    </div>
  );
};

export default PetCard;
