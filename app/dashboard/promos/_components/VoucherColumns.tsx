import { Voucher } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "../../_components/DataTableColumnHeader";
import { format } from "date-fns";
import { VouchersRowActions } from "./VouchersRowActions";

export const VouchersColumns: ColumnDef<Voucher>[] = [
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
    accessorKey: "voucherName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="w-[120px] py-1">{row.getValue("voucherName")}</div>
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
    accessorKey: "totalVouchers",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vouchers" />
    ),
    cell: ({ row }) => <div>{row.getValue("totalVouchers")}</div>,
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "vouchersUsed",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Used" />
    ),
    cell: ({ row }) => <div>{row.getValue("vouchersUsed")}</div>,
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "discountOffValue",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Discount" />
    ),
    cell: ({ row }) => <div>{row.getValue("discountOffValue")}</div>,
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "discountType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Discount Type" />
    ),
    cell: ({ row }) => <div>{row.getValue("discountType")}</div>,
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
    cell: ({ row }) => <VouchersRowActions row={row} />,
  },
];
