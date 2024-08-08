"use client"

import { useEffect } from "react";
import useUserStore from "@/zustand/userStore";
import { redirect } from 'next/navigation'

const Admin = () => {
  const { user } = useUserStore((state) => state);

  useEffect(() => {
    redirect('admin/users');
  }, []);
}

export default Admin;