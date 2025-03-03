"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  TableOptions,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
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

import { DataTablePagination } from "./DataTablePagination";
import { useState } from "react";
import { DataTableToolbar } from "./DataTableToolbar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getSearchParamsStringsArray } from "@/app/_utils";

export function DataTable<TData, TValue>({
  pageSize = 50,
  columns,
  data,
  ...tableOptions
}: Omit<TableOptions<TData>, "getCoreRowModel"> & {
  pageSize?: number;
}) {
  const searchParams = useSearchParams();
  const pageIndex = parseInt(searchParams.get("page") || "1") - 1;

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex,
    pageSize,
  });

  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    const searchParamsStringsArray = getSearchParamsStringsArray(searchParams, [
      "page",
    ]);

    if (pageIndex !== 0)
      searchParamsStringsArray.push(`page=${pagination.pageIndex + 1}`);

    router.push(`${pathname}?${searchParamsStringsArray.join("&")}`);
  }, [pagination]);

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
    },
    ...tableOptions,
    manualPagination: true,
    enableGlobalFilter: true,
    enableRowSelection: true,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} />

      <div className="rounded-md border flex-1">
        <Table contClassName="flex-1 max-h-[390px] h-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
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
                  key={row.id}
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
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination table={table} />
    </div>
  );
}
