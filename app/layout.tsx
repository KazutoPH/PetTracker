import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import SectionContextProvider from "@/context/ContextProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PetTracker",
  description: "A Pet Tracking Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <SectionContextProvider>
          <NavBar />
          {children}
        </SectionContextProvider>
      </body>
    </html>
  );
}
