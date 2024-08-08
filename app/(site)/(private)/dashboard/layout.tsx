
import React from "react";
import Meta from "@/components/Meta";

export const metadata = {
  ...Meta({
    title: "Dashboard",
  }),
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full h-full">
      {children}
    </div>
  );
}
