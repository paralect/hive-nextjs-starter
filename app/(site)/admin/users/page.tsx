"use client";

import { DataTable } from "@/components/ui/data-table";
import { POST } from "@/lib/api";
import { AddUserButtonDialog } from './components/AddUserButtonDialog';
import useTable from '@/hooks/useTable';
import { User } from "@/types/user"

import { ColumnDef } from "@tanstack/react-table"

import { useState } from 'react';
import { FaEllipsis } from "react-icons/fa6"
import { Button } from "@/components/ui/button"
import { Key } from 'lucide-react';
import { EditPasswordDialog } from './components/EditPasswordDialog';
import { GET } from "@/lib/api";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const Users = () => {

  const tableParams = useTable<User>({
    queryFn: async () => {
      const { pagination, searchQuery } = tableParams;

      return GET("users", {
        page: pagination.pageIndex + 1,
        perPage: pagination.pageSize,
        searchQuery
      })
    },
  });

  const [userToEditPassword, setUserToEditPassword] = useState(null);

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "fullName",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => {
        const email = row.original.email;

        return (
          email
        );
      },
    },
    {
      accessorKey: "subscription",
      header: "Subscription",
      cell: ({ row }) => {
        const user = row.original;

        return user.subscription?.planName || 'Free Trial';
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const user = row.original;

        return (
          <>
            <Button className="mr-4" variant="outline" onClick={async () => {
              const { token, user: newAuthUser } = await POST('auth/shadow-admin', {
                userId: user._id
              });

              window.sessionStorage.setItem('shadowToken', token);

              window.location.href = '/';
            }}>
              <Key></Key>
            </Button>
            <DropdownMenu >
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <FaEllipsis className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => setUserToEditPassword(user)}
                >
                  Update Password
                </DropdownMenuItem>
                {/* <DropdownMenuSeparator /> */}
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )
      },
    },
  ];


  return (
    <div className="w-full">
      <header className="p-8">
        <h1 className="text-2xl font-semibold leading-normal text-slate-950">
          Users
        </h1>
      </header>

      <div className="px-8 pb-8 flex-col justify-start items-start gap-2.5 flex">
        <DataTable<User>
          // @ts-ignore
          {...tableParams}
          columns={columns}
          searchPlaceholder='Search by name or email...'
          searchRightSlot={<AddUserButtonDialog onCreated={() => {
            console.log('Created');
          }}></AddUserButtonDialog>}
        />
        <EditPasswordDialog user={userToEditPassword} isOpen={!!userToEditPassword} setIsOpen={(isOpen, { isUpdated = false } = {}) => setUserToEditPassword(null)}></EditPasswordDialog>
      </div>
    </div>
  );
};

export default Users;
