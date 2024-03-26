"use client";

import React, { useState, createContext, useContext } from "react";

interface SectionContextProviderProps {
  children: React.ReactNode;
}

interface ContextProvider {
  customButtonSelected: string;
  setCustomButtonSelected: React.Dispatch<React.SetStateAction<string>>;
}
export const ContextProvider = createContext<ContextProvider | null>(null);

function SectionContextProvider({ children }: SectionContextProviderProps) {
  const [customButtonSelected, setCustomButtonSelected] = useState<string>("");

  return (
    <ContextProvider.Provider
      value={{ customButtonSelected, setCustomButtonSelected }}
    >
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
