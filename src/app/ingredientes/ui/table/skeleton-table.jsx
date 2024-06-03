"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { columns } from "../table/columns";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function SkeletonTable() {
  const table = useReactTable({
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="w-full rounded-md border">
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
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonRow key={index} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function SkeletonRow() {
  return (
    <TableRow className="h-[49px]">
      <TableCell className="pl-4">
        <Skeleton className="h-4 w-28 rounded-xl" />
      </TableCell>
      <TableCell className="pl-16">
        <Skeleton className="h-4 w-16 rounded-xl" />
      </TableCell>
      <TableCell className="pl-16">
        <Skeleton className="h-4 w-24 rounded-xl" />
      </TableCell>
      <TableCell className="pl-20">
        <Skeleton className="h-4 w-20 rounded-xl" />
      </TableCell>
      <TableCell className="pl-28">
        <Skeleton className="h-4 w-24 rounded-xl" />
      </TableCell>
    </TableRow>
  );
}
