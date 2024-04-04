"use client";

import React from "react";
import { useContextProvider } from "@/context/ContextProvider";

interface ButtonProps {
  route: string;
  icon: any;
  modalId?: string
}

function RouteButton({ route, icon, modalId }: ButtonProps) {
  const { modal, setModal, setModalId } = useContextProvider()

  return (
    <button
      type="button"
      onClick={() => {
        setModal(route)
        console.log(modal)
        { modalId && setModalId(modalId) }
      }}
    >
      {icon}
    </button>
  );
}

export default RouteButton;
