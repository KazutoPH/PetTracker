"use client";

import React, { useState, createContext, useContext } from "react";

interface SectionContextProviderProps {
  children: React.ReactNode;
}

interface ContextProvider {
  modal: string;
  modalId: string;
  setModal: React.Dispatch<React.SetStateAction<string>>;
  setModalId: React.Dispatch<React.SetStateAction<string>>;
}
export const ContextProvider = createContext<ContextProvider | null>(null);

function SectionContextProvider({ children }: SectionContextProviderProps) {
  const [modal, setModal] = useState<string>('');
  const [modalId, setModalId] = useState<string>('')

  return (
    <ContextProvider.Provider value={{ modal, setModal, modalId, setModalId }}>
      {children}
    </ContextProvider.Provider>
  );
}

export function useContextProvider() {
  const context = useContext(ContextProvider);

  if (context === null) {
    throw new Error(
      "useActiveContext must be used within an ActiveSectionProvider"
    );
  }

  return context;
}

export default SectionContextProvider;
