"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface ButtonProps {
  route: string;
  icon: any;
  customFunction?: () => void;
}

function RouteButton({ route, icon, customFunction }: ButtonProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);
  const addPetParams = searchParams.get("addPet");
  const { replace } = useRouter();

  return (
    <button
      onClick={() => {
        replace(`${pathname}?${route}`);
        {
          customFunction && customFunction;
        }
      }}
    >
      {icon}
    </button>
  );
}

export default RouteButton;
