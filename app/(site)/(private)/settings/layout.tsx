
import React from "react";
import Meta from "@/components/Meta";
import { Navbar } from "@/app/navbar";

export const metadata = {
  ...Meta({
    title: "Settings",
  }),
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-grow w-full">

      {children}
    </div>
  );
}
