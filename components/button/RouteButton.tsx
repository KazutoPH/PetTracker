"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface ButtonProps {
  route: string;
  icon: any;
}

function RouteButton({ route, icon }: ButtonProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);
  const addPetParams = searchParams.get("addPet");
  const { replace } = useRouter();

  return (
    <button
      onClick={() => {
        replace(`${pathname}?${route}`);
      }}
    >
      {icon}
    </button>
  );
}

export default RouteButton;
