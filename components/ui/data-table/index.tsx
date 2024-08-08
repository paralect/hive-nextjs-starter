"use client";
import { ReactNode, useMemo, useState, useEffect } from "react";

import _ from 'lodash';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  PaginationState,
} from "@tanstack/react-table";
import { FaRotateRight } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "./pagination";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import Spinner from "@/components/Spinner";
import SpinnerCircle from "@/components/SpinnerCircle";

import { ApiResult } from '@/lib/api';

interface DataTableProps<TData> {
  data: ApiResult<TData>;
  setData: (data: ApiResult<TData>) => void;
  reloadData: () => Promise<void>;
  isFetching: boolean;

  columns: ColumnDef<TData>[];
  searchLeftSlot?: ReactNode;
  searchRightSlot?: ReactNode;
  placeholder?: ReactNode;

  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  setPagination: (pagination) => void,

  searchPlaceholder?: string | null;
  searchQuery: string;
  setSearchQuery: (searchQuery) => void,
}

export function DataTable<TData>({
  data,
  setData,
  reloadData,
  isFetching,

  columns,
  searchLeftSlot,
  searchRightSlot,
  placeholder,

  pagination,
  setPagination,

  searchPlaceholder = 'Search...',
  searchQuery,
  setSearchQuery
}: DataTableProps<TData>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  if (!pagination) {
    setPagination({
      pageIndex: 0,
      pageSize: 10,
    })
  }

  const [refreshDate, setRefreshDate] = useState(null);

  useEffect(() => {
    if (refreshDate) {
      reloadData();
    }
  }, [refreshDate])

  const defaultData = useMemo(() => [], []);

  const table = useReactTable({
    data: data?.results ?? defaultData,
    columns,
    pageCount: data?.pagesCount ?? -1,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
    onPaginationChange: setPagination,
    state: {
      columnFilters,
      pagination,
    },
  });

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-x-4">
            <div className="flex items-center gap-2 pl-3 border rounded-md border-slate-200 focus-within:ring-2 focus-within:ring-ring w-[200px] xl:w-[300px]">
              <SearchIcon className="size-5 text-slate-500" />
              <Input
                placeholder={searchPlaceholder}
                value={searchQuery}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    setRefreshDate(new Date());
                  }
                }}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  // table.getColumn(searchColumn)?.setFilterValue(event.target.value);
                }}
                className="max-w-sm p-0 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>

            {searchLeftSlot}
          </div>
        </div>

        <div className="flex items-center gap-x-4">
          <Button variant="ghost" onClick={() => { reloadData(); }}>
            {isFetching ? (<SpinnerCircle></SpinnerCircle>) : (<FaRotateRight></FaRotateRight>)}
          </Button>
          {searchRightSlot}
        </div>
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.original._id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="py-10 text-center"
                >
                  {isFetching ? <Spinner /> :
                    placeholder ? placeholder : "No results."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} isFetching={isFetching} />
     
    </div>
  );
}
