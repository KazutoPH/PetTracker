// "use client";

// import React, { useState, createContext, useContext } from "react";

// interface SectionContextProviderProps {
//   children: React.ReactNode;
// }

// interface ContextProvider {
//   isLoggedIn: boolean;
//   setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
// }
// export const ContextProvider = createContext<ContextProvider | null>(null);

// function SectionContextProvider({ children }: SectionContextProviderProps) {
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

//   return (
//     <ContextProvider.Provider value={{ isLoggedIn, setIsLoggedIn }}>
//       {children}
//     </ContextProvider.Provider>
//   );
// }

// export function useContextProvider() {
//   const context = useContext(ContextProvider);

//   if (context === null) {
//     throw new Error(
//       "useActiveContext must be used within an ActiveSectionProvider"
//     );
//   }

//   return context;
// }

// export default SectionContextProvider;
