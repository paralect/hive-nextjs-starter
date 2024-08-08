
import React from "react";
import Meta from "@/components/Meta";

export const metadata = {
  ...Meta({
    title: "Users",
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
