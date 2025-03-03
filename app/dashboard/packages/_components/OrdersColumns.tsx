import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { getOrderPckgs } from "../_serverFn/getOrderPckgs";
import { DataTableColumnHeader } from "../../_components/DataTableColumnHeader";
import { OrdersRowActions } from "./OrdersRowActions";

export const OrdersColumns: ColumnDef<
  Awaited<ReturnType<typeof getOrderPckgs>>["packages"][0]
>[] = [
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
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Placed At" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        {format(row.getValue("createdAt"), "yyyy-MM-dd")}
      </div>
    ),
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "customerId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer Id" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-4">
        {row.getValue("customerId")}
      </div>
    ),
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "totalQuantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity of Items" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-4">
        {row.getValue("totalQuantity")}
      </div>
    ),
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "totalAmmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Ammount" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-4">
        Rs.{row.getValue("totalAmmount")}
      </div>
    ),
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-4">
        <Badge variant={"secondary"} className="text-gray-900">
          {row.getValue("status")}
        </Badge>
      </div>
    ),
    enableHiding: true,
    enableSorting: true,
  },
  {
    id: "actions",
    cell: ({ row }) => <OrdersRowActions row={row} />,
  },
];
