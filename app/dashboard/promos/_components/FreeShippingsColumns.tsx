import { FreeShipping } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "../../_components/DataTableColumnHeader";
import { format } from "date-fns";
import { FreeShippingsRowActions } from "./FreeShippingsRowActions";

export const FreeShippingsColumns: ColumnDef<FreeShipping>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        aria-label="Select all"
        className="translate-y-[2px]"
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label="Select row"
        className="translate-y-[2px]"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "promotionName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Promo Name" />
    ),
    cell: ({ row }) => (
      <div className="w-[180px] py-1">{row.getValue("promotionName")}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "startingDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Starting Date" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        {format(row.getValue("startingDate"), "yyyy-MM-dd")}
      </div>
    ),
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "endingDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ending Date" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        {format(row.getValue("endingDate"), "yyyy-MM-dd")}
      </div>
    ),
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "condition",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Condition" />
    ),
    cell: ({ row }) => <div>{row.getValue("condition")}</div>,
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "applicableOn",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Applicable On" />
    ),
    cell: ({ row }) => <div>{row.getValue("applicableOn")}</div>,
    enableHiding: true,
    enableSorting: true,
  },
  {
    id: "actions",
    cell: ({ row }) => <FreeShippingsRowActions row={row} />,
  },
];
