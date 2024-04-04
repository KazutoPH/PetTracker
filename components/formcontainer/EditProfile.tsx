"use client";

import { UserType } from "@/types";
import { useSearchParams } from "next/navigation";
import Onboarding from "../forms/Onboarding";
import { useContextProvider } from "@/context/ContextProvider";

function EditProfile({ user }: { user: UserType }) {
  const searchParams = useSearchParams();
  const { modal, setModal } = useContextProvider()

  return (
    <>
      {modal === 'editProfile' && (
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
