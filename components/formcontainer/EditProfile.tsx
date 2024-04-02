"use client";

import { UserType } from "@/types";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Onboarding from "../forms/Onboarding";

function EditProfile({ user }: { user: UserType }) {
  const [showForm, setshowForm] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);
  const editProfileParams = searchParams.get("editProfile");

  useEffect(() => {
    if (editProfileParams) setshowForm(true);
    else setshowForm(false);
  }, [editProfileParams]);

  return (
    <>
      {showForm && (
        <div className="darkbg padding-container">
          <Onboarding
            user={user}
            title={"Update Profile"}
            closeBtn={true}
            edit={true}
          />
        </div>
      )}
    </>
  );
}

export default EditProfile;
