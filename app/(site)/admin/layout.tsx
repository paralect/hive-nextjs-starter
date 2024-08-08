"use client"

import { useEffect, useState } from "react";
import useUserStore from "@/zustand/userStore";
import { redirect } from 'next/navigation'
import { Navbar } from "@/app/navbar";

const AdminLayout = ({ children }) => {
  const { user } = useUserStore((state) => state);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isLoaded && user && !user.isAdmin) {
      redirect('dashboard');
    }

    if (user && !isLoaded) {
      setIsLoaded(true);
    }
  }, [user]);

  return (
    <div className="flex flex-grow w-full h-full">
      <Navbar />
      <div className="w-[calc(100vw-250px)] xl:w-[calc(100vw-350px)] ">
        {user && children}
      </div>
    </div>
  );
}

export default AdminLayout;