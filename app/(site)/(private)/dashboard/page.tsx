"use client";


import Link from "next/link";
import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Database, Zap } from "lucide-react";
import PeopleIcon from "public/people.svg";
import { Project } from '@/types/project';
import TablePlaceholder from "./table-placeholder";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import useUserStore from "@/zustand/userStore";
import useTable from '@/hooks/useTable';
import { GET, DELETE } from "@/lib/api";
import AddProjectDialog from "@/components/pages/AddProjectDialog";
import { ColumnDef } from "@tanstack/react-table";

import { FaEllipsis } from "react-icons/fa6";
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import ConfirmDialog from '@/components/ConfirmDialog';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DialogContent } from "@radix-ui/react-dialog";


const Dashboard = () => {
  const searchParams = useSearchParams();

  const { user } = useUserStore((state) => state);
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);

  const [projectToDelete, setProjectToDelete] = useState(null);

  const setUser = useUserStore((state) => state.setUser);

  const loadProjects = async () => {
    const { pagination, searchQuery } = tableParams;

    const projectResults = await GET("projects", {
      page: pagination.pageIndex + 1,
      perPage: pagination.pageSize,
      searchQuery,

      // additional search filters here
    });

    if (!user.totalProjectCount) {
      setUser({
        ...user,
        totalProjectCount: projectResults.count
      });
    }

    return projectResults;
  }

  const tableParams = useTable<Project>({
    queryFn: loadProjects,
  });

  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    tableParams.reloadData();
  }, []);

  const columns: ColumnDef<Project>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        const project = row.original;

        return (
          <span className="inline-flex gap-2.5 items-center">
            {project.name}
          </span>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const project = row.original;

        return (
          <div className="flex items-center justify-end gap-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <FaEllipsis className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={async () => {
                    setProjectToDelete(project);
                  }}
                >
                  Delete project
                </DropdownMenuItem>
                {/* <DropdownMenuSeparator /> */}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      },
    },
  ];

  if (user) {
    return (
      <div className="w-full">
        <div className="w-full">
          <header className="p-8">
            <h1 className="text-3xl font-bold leading-9 text-slate-950">
              Hello, {user.fullName?.split(' ')[0]}
            </h1>
            <p className="text-sm font-normal leading-tight text-slate-500 mt-2">
            </p>
          </header>
        </div>
        <div className="px-8 pb-8 flex-col justify-start items-start gap-2.5 flex w-full">
          <div className="flex self-stretch justify-start gap-4 pb-8">
            <div className="inline-flex flex-col items-start justify-start gap-2 bg-white border rounded-lg shadow w-60 border-slate-200">
              <div className="self-stretch h-14 px-4 pt-4 xl:px-6 xl:pt-6 pb-3 flex-col justify-start items-start gap-1.5 flex">
                <div className="inline-flex items-center self-stretch justify-between">
                  <div className="flex items-center justify-center">
                    <div className="text-sm font-medium leading-tight text-slate-950">
                      Total projects
                    </div>
                  </div>
                  <Database className="relative w-4 h-4 opacity-50" />
                </div>
              </div>
              <div className="flex flex-col items-start self-stretch justify-start h-12 gap-1 px-4 pb-4 xl:px-6 xl:pb-6">
                <div className="inline-flex items-center justify-center">
                  <div className="text-2xl font-bold leading-normal text-slate-950">
                    {(user.totalProjectCount || 0).toString()}
                  </div>
                </div>
              </div>
            </div>
            <div className="inline-flex flex-col items-start justify-start gap-2 bg-white border rounded-lg shadow w-60 border-slate-200">
              <div className="self-stretch h-14 px-4 pt-4 xl:px-6 xl:pt-6 pb-3 flex-col justify-start items-start gap-1.5 flex">
                <div className="inline-flex items-center self-stretch justify-between">
                  <div className="flex items-center justify-center">
                    <div className="text-sm font-medium leading-tight text-slate-950">
                      Team
                    </div>
                  </div>
                  <PeopleIcon className="relative w-4 h-4 " />
                </div>
              </div>
              <div className="inline-flex items-center justify-between w-full px-4 pb-4 xl:px-6 xl:pb-6">

                <Link href="/settings"
                  className="py-1 text-sm font-medium leading-normal rounded-md text-primary-foreground ml-4 whitespace-nowrap"
                >
                  Add Members
                </Link>
              </div>
            </div>
            <div className="inline-flex flex-col items-start justify-start flex-grow gap-2 bg-white border rounded-lg shadow border-slate-200">
              <div className="self-stretch h-14 px-4 pt-4 xl:px-6 xl:pt-6 pb-3 flex-col justify-start items-start gap-1.5 flex">
                <div className="inline-flex items-center self-stretch justify-between h-5">
                  <div className="flex items-center justify-center">
                    <div className="text-sm font-medium leading-tight text-slate-950">
                      Active plan
                    </div>
                  </div>
                  <Zap className="relative w-4 h-4 opacity-50" />
                </div>
              </div>
              <div className="inline-flex items-center self-stretch justify-between px-4 pb-4 xl:px-6 xl:pb-6">
                <div className="xl:w-[136px] flex-col justify-start items-start gap-0.5 inline-flex">
                  <div className="text-xl font-bold leading-normal text-slate-950 whitespace-nowrap">
                    {user.subscription?.planName || 'Free trial'}
                  </div>

                </div>

                <Dialog>
                  <DialogTrigger asChild className="gap-2 flex">
                    <div
                      className="py-1 pl-2 text-sm font-medium leading-normal rounded-md text-primary-foreground cursor-pointer"
                    >
                      Upgrade
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <div>Upgrade here</div>
                  </DialogContent>

                </Dialog>
              </div>
            </div>
          </div>

          <DataTable<Project>
            {...tableParams}
            columns={columns}
            searchPlaceholder="Search by name"
            searchLeftSlot={(
              <div className="flex gap-x-2">
                {/* <Combobox
                  placeholder="Select list"
                  value={selectedBulkList?._id || 'all'}
                  onValueChange={listId => setSelectedBulkList(bulkLists.find(l => l._id === listId))}
                  values={[{ _id: 'all', title: 'All Lists' }, ...(bulkLists || [])]}
                  valueKey="_id"
                  labelKey="title"
                >
                </Combobox>

                <Select
                  defaultValue={processingStatus}
                  onValueChange={setProcessingStatus}
                >
                  <SelectTrigger className='w-auto focus:hidden'>
                    <SelectValue placeholder={''} />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(listStatuses).map((statusName) => (
                      <SelectItem key={statusName} value={statusName}>
                        {statusName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select> */}
              </div>
            )}
            searchRightSlot={<Button onClick={() => {
              setIsProjectDialogOpen(true);
            }}>Add project</Button>}
            placeholder={<TablePlaceholder action={(<Button onClick={() => {
              setIsProjectDialogOpen(true);
            }}>Add first project</Button>)} />}
          />

          <AddProjectDialog isOpen={isProjectDialogOpen}
            setIsOpen={setIsProjectDialogOpen} onCreated={(project) => {
              tableParams.unshiftItem(project);
            }} />

          <AlertDialog open={!!projectToDelete} onOpenChange={() => {
            setProjectToDelete(null);
          }}>
            <ConfirmDialog onClick={async () => {
              await DELETE(`projects/${projectToDelete._id}`);
              setProjectToDelete(null);
              tableParams.removeItem(projectToDelete);
            }} />
          </AlertDialog>
        </div>
      </div>
    );
  }
};

export default Dashboard;
