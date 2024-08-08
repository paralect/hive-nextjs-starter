
import React from "react";
import Meta from "@/components/Meta";
import { Navbar } from "@/app/navbar";

export const metadata = {
  ...Meta({
    title: "Hive UI",
  }),
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full h-full">
      <Navbar />
      <div className="w-[calc(100vw-250px)] xl:w-[calc(100vw-350px)] ">
        {children}
      </div>
    </div>
  );
}
