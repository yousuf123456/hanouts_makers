"use client";
import { statusStyles } from "@/app/constants/styling";
import { DataGrid } from "@/app/dashboard/products/list/components/DataGrid";
import { cn } from "@/lib/utils";
import { GridColDef } from "@mui/x-data-grid/models/colDef/gridColDef";
import Image from "next/image";
import React from "react";
import { OrdersListActions } from "./OrdersListActions";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "Order ID",
    width: 210,
    headerAlign: "left",
    valueGetter: (params) => {
      return params.row._id.$oid;
    },
  },
  {
    field: "ammount",
    headerName: "Total",
    width: 100,
    headerAlign: "left",
    renderCell: (params) => {
      return (
        <p
          className="text-green-500 font-medium font-text MuiDataGrid-cellContent"
          role="presentation"
        >
          Rs. {params.row.ammount}
        </p>
      );
    },
  },
  {
    field: "status",
    headerName: "Status",
    width: 200,
    headerAlign: "left",
    renderCell: (params) => {
      return (
        <div
          className={cn(
            "px-3 py-1 rounded-md MuiDataGrid-cellContent z-[-10]",
            //@ts-ignore
            statusStyles[params.row.status]
          )}
          role="presentation"
        >
          <p className="text-xs">{params.row.status}</p>
        </div>
      );
    },
  },

  {
    field: "customer",
    headerName: "Customer",
    width: 220,
    headerAlign: "left",
    renderCell: (params) => {
      return (
        <div
          className="flex gap-2 items-center MuiDataGrid-cellContent py-2"
          role="presentation"
        >
          <div className="w-7 h-7 flex-shrink-0 rounded-full relative overflow-hidden">
            <Image
              src={
                params.row.customer[0].image || "/placeHolders/placeholder.jpg"
              }
              className="object-cover"
              alt="Customer Image"
              fill
            />
          </div>

          <div
            className="flex flex-col gap-0 MuiDataGrid-cellContent"
            role="presentation"
          >
            <p className=" text-black">{params.row.customer[0].name}</p>
            <p className=" text-neutral-600 text-xs line-clamp-1">
              {params.row.customer.phone || params.row.customer[0].email}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    field: "createdAt",
    headerName: "Created At",
    type: "dateTime",
    headerAlign: "left",
    valueGetter: (params) => {
      return new Date(params.row.createdAt.$date);
    },
    width: 200,
  },
  {
    field: "actions",
    headerName: "Actions",
    headerAlign: "center",
    renderCell: (params) => {
      return <OrdersListActions />;
    },
    width: 80,
  },
];

const mockRow = [
  {
    _id: { $oid: "Loading" },
    ammount: "Loading",
    status: "Loading",
    customer: [
      {
        image: "/placeHolders/placeholder.jpg",
        name: "Loading",
        phone: "Loading",
      },
    ],
    createdAt: new Date(),
  },
];

const serverSorts = [
  {
    label: "Created At",
    fieldName: "createdAt",
  },
  {
    label: "Ammout",
    fieldName: "ammount",
  },
];

interface OrdersListProps {
  count: number;
}

export const OrdersList: React.FC<OrdersListProps> = ({ count }) => {
  return (
    // <p>Data Grid Here</p>
    <DataGrid
      count={count}
      mockRow={mockRow}
      serverSorts={serverSorts}
      columnDefination={columns}
      dataSourceApi="../../../../api/getVendorOrders"
    />
  );
};
