"use client";
import React from "react";
import { DataGrid } from "../../products/list/components/DataGrid";
import { GridColDef } from "@mui/x-data-grid/models/colDef/gridColDef";
import { Tooltip } from "@nextui-org/react";
import { Seperator } from "@/app/sharedComponents/Seperator";

const columnDefination: GridColDef[] = [
  {
    field: "productIds",
    headerName: "Product ID(s)",
    width: 210,
    headerAlign: "left",
    renderCell: (params) => {
      return (
        <div className="flex flex-col gap-1 py-2">
          {params.row.orderedProducts.map((orderedProduct: any, i: number) => (
            <div className="flex flex-col gap-1">
              <p className="MuiDataGrid-cellContent" role="presentation">
                {orderedProduct.product.id}
              </p>
              {params.row.orderedProducts.length !== i + 1 && (
                <Seperator className=" bg-neutral-200" />
              )}
            </div>
          ))}
        </div>
      );
    },
  },
  {
    field: "ammount",
    headerName: "Ammount",
    width: 100,
    headerAlign: "left",
    renderCell: (params) => {
      return (
        <div
          className="flex flex-col gap-1 MuiDataGrid-cellContent py-2"
          role="presentation"
        >
          {params.row.orderedProducts.map((orderedProduct: any, i: number) => (
            <div className="flex flex-col gap-1">
              <p className=" text-green-500 font-text">
                Rs. {orderedProduct.priceAtOrderTime}
              </p>
              {params.row.orderedProducts.length !== i + 1 && (
                <Seperator className=" bg-neutral-200" />
              )}
            </div>
          ))}
        </div>
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
        <p
          className="text-xs px-3 py-1 bg-pink-100 rounded-2xl text-pink-500"
          role="presentation"
        >
          {params.row.status}
        </p>
      );
    },
  },
  {
    field: "reason",
    headerName: "Reason",
    width: 200,
    headerAlign: "left",
    renderCell: (params) => {
      return (
        <div
          className="flex flex-col gap-1 MuiDataGrid-cellContent py-2"
          role="presentation"
        >
          {params.row.orderedProducts.map((orderedProduct: any, i: number) => (
            <div className="flex flex-col gap-1">
              <p className="MuiDataGrid-cellContent">
                {orderedProduct.returnReason}
              </p>
              {params.row.orderedProducts.length !== i + 1 && (
                <Seperator className=" bg-neutral-200" />
              )}
            </div>
          ))}
        </div>
      );
    },
  },
  {
    field: "orderFeedback",
    headerName: "Comments",
    width: 200,
    headerAlign: "left",
    renderCell: (params) => {
      return (
        <p className="MuiDataGrid-cellContent py-3" role="presentation">
          {params.row.orderFeedback}
        </p>
      );
    },
  },
];

export const CustomerReturnsList = ({ count }: { count: number }) => {
  return (
    <DataGrid
      count={count}
      columnDefination={columnDefination}
      dataSourceApi="../../../api/getCustomerReturnedOrders"
    />
  );
};
