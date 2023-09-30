"use client";
import { GridColDef } from "@mui/x-data-grid/models/colDef/gridColDef";
import React from "react";
import { DataGrid } from "./DataGrid";
import { ProductListActions } from "./ProductListActions";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Product",
    width: 200,
    headerAlign: "left",
  },
  {
    field: "SKU",
    headerName: "SKU",
    width: 150,
    headerAlign: "left",
  },
  {
    field: "price",
    headerName: "Price",
    type: "number",
    width: 150,
    headerAlign: "left",
  },
  {
    field: "quantity",
    headerName: "Stock",
    type: "number",
    width: 200,
    headerAlign: "left",
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
    width: 100,
    renderCell: (params) => {
      return <ProductListActions productId={params.row._id.$oid} />;
    },
  },
];

const mockRow = [
  {
    _id: { $oid: "1" },
    name: "Loading",
    SKU: "loading",
    price: 0,
    quantity: 0,
    createdAt: new Date(),
  },
];

interface ProductsListProps {
  count: number;
}

const serverSorts = [
  {
    label: "Created At",
    fieldName: "createdAt",
  },
  {
    label: "Price",
    fieldName: "price",
  },
];

export const ProductsList: React.FC<ProductsListProps> = ({ count }) => {
  return (
    <DataGrid
      dataSourceApi="../../../../api/getVendorProducts"
      columnDefination={columns}
      serverSorts={serverSorts}
      mockRow={mockRow}
      count={count}
    />
  );
};
