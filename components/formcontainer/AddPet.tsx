"use client";

import { UserType } from "@/types";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function AddPet() {
  const [showForm, setshowForm] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);
  const editProfileParams = searchParams.get("editProfile");

  useEffect(() => {
    if (editProfileParams) setshowForm(true);
    else setshowForm(false);
  }, [editProfileParams]);

  return <div>AddPet</div>;
}

export default AddPet;
