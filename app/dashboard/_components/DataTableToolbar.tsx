"use client";

import { Table } from "@tanstack/react-table";

import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./DataTableViewOptions";
// import { DataTableViewOptions } from "@/app/(app)/examples/tasks/components/data-table-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search for any field..."
          onChange={(e) => table.setGlobalFilter(e.target.value)}
          className="h-9 w-[270px] lg:w-[320px]"
        />
      </div>

      <DataTableViewOptions table={table} />
    </div>
  );
}
