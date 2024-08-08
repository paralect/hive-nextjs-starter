"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Settings, Lock } from "lucide-react";

import { cn } from "@/lib/utils";
import useUserStore from "@/zustand/userStore";
import { Avatar } from "@/components/Avatar";

export const Navbar = () => {
  const pathname = usePathname();
  const { user } = useUserStore();

  return (
    <nav className="inline-flex flex-col items-start justify-between border bg-primary-light w-[250px] xl:w-[350px] flex-shrink-0">
      <div className="flex flex-col items-start self-stretch justify-start pb-[225px]">
        <Link href="/dashboard" className="inline-flex items-center self-stretch h-16 gap-2 px-6">
          <div className="text-sm text-[#5B3506] font-semibold leading-normal text-black">
            Hive
          </div>
        </Link>


        {user && (
          <div className="self-stretch px-4 pb-4 flex-col justify-start items-start gap-2.5 flex mb-2">
            <div className="flex flex-col items-start justify-start gap-2 bg-white border rounded-lg shadow border-slate-200 w-full">
              <div className="inline-flex items-center self-stretch justify-start gap-3 p-4 border-b border-slate-200 w-full">
                <Avatar />
                <div className="inline-flex flex-col items-start justify-start">
                  <div className="text-sm font-medium leading-tight text-[#5B3506]">
                    {user.fullName}
                  </div>
                  <div className="text-sm font-normal leading-tight text-[#5B3506]">
                    {user.email}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="self-stretch h-[123px] px-4 flex-col gap-3 flex">
          <Link
            href="/dashboard"
            className={cn(
              "text-[#7C694C] text-sm font-medium  w-full flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
              pathname === "/dashboard" ? "text-[#5B3506] bg-primary-md" : ""
            )}
          >
            <Home className="transition-all size-4" />
            <span>Dashboard</span>
          </Link>

          <Link
            href="/settings"
            className={cn(
              "text-[#7C694C] text-sm font-medium  w-full flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
              pathname === "/settings" ? "text-[#5B3506] bg-primary-md" : ""
            )}
          >
            <Settings className="transition-all size-4" />
            <span>Settings</span>
          </Link>

          {user?.isAdmin && (
            <>
              <Link href="/admin" className="flex items-center mt-12 gap-x-2">
                <Lock className="text-[#5b3506] transition-all size-4" />
                <span className="text-[#5b3506] text-sm font-semibold">Admin</span>
              </Link>
              <hr className="mb-2 mt-2" />
            </>
          )}

          {pathname.startsWith('/admin') ? (<>
            <Link
              href="/admin/users"
              className={cn(
                "text-[#7C694C] text-sm font-medium  w-full flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                pathname === "/admin/users" ? "text-[#5B3506] bg-primary-md" : ""
              )}
            >
              <Users className="transition-all size-4" />
              <span>Users</span>
            </Link>
          </>) : (<div></div>)}

        </div>

      </div>

    </nav>
  );
};
