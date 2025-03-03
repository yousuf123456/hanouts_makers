import { Checkbox } from "@/components/ui/checkbox";
import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../../_components/DataTableColumnHeader";

import { FaStar } from "react-icons/fa";

import { format } from "date-fns";
import { ProductsRowActions } from "./ProductRowActions";
import { getProducts } from "../_serverFn/getProducts";

export const ProductColumns: ColumnDef<
  Awaited<ReturnType<typeof getProducts>>["products"][0]
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
    accessorKey: "SKU",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SKU" />
    ),
    cell: ({ row }) => (
      <div className="w-[120px] py-1">{row.getValue("SKU")}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <div className="w-[180px]">{row.getValue("name")}</div>,
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => <div>Rs.{row.getValue("price")}</div>,
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "promoPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Promo Price" />
    ),
    cell: ({ row }) => <div>Rs.{row.getValue("promoPrice")}</div>,
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stock" />
    ),
    cell: ({ row }) => <div>{row.getValue("quantity")}</div>,
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "clicks",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Clicks" />
    ),
    cell: ({ row }) => <div>{row.getValue("clicks")}</div>,
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "numOfSales",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sales" />
    ),
    cell: ({ row }) => <div>{row.getValue("numOfSales")}</div>,
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "avgRating",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Avg Rating" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-4">
        {row.getValue("numOfSales")}
        <FaStar className="w-4 h-4 text-black fill-black" />
      </div>
    ),
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
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
    id: "actions",
    cell: ({ row }) => <ProductsRowActions row={row} />,
  },
];
