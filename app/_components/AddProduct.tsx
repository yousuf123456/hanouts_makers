import React, { useState } from "react";

import Image from "next/image";
import { Button } from "@/app/sharedComponents/Button";
import { Button as ShadButton } from "@/components/ui/button";
import { DialogModel } from "@/app/sharedComponents/DialogModel";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { GridColDef } from "@mui/x-data-grid/models/colDef/gridColDef";
import { DataGrid } from "@/app/dashboard/products/list/components/ClientDataGrid";
import { GridRowSelectionModel } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  {
    field: "image",
    headerName: "Picture",
    width: 100,
    headerAlign: "left",
    renderCell: (params) => {
      return (
        <div className=" relative my-3 h-16 w-16 flex-shrink-0">
          <Image
            src={params.row.image}
            alt="Product Picture"
            className="object-cover"
            fill
          />
        </div>
      );
    },
  },
  {
    field: "name",
    headerName: "Product Name",
    width: 350,
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
    width: 100,
    headerAlign: "left",
  },
  {
    field: "promoPrice",
    headerName: "Promo Price",
    type: "number",
    width: 130,
    headerAlign: "left",
    valueGetter: () => 250,
  },
  {
    field: "quantity",
    headerName: "Available Stock",
    type: "number",
    headerAlign: "left",
    width: 130,
  },
];

const mockRow = [
  {
    image: "",
    _id: { $oid: "1" },
    name: "Loading",
    SKU: "loading",
    price: 0,
    quantity: 0,
  },
];

interface AddProductProps {
  isCurrentlyLive: boolean;
  maxSelections?: number;
  selectedProducts: string[];
  onAddProducts: (ids: string[]) => void;
}

export const AddProduct: React.FC<AddProductProps> = ({
  isCurrentlyLive,
  maxSelections,
  onAddProducts,
  selectedProducts,
}) => {
  const [selectedProductIds, setSelectedProductIds] =
    useState<GridRowSelectionModel>(selectedProducts || []);

  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        disabled={isCurrentlyLive}
        type="button"
        onClick={() => setOpen(true)}
      >
        Add Products
      </Button>

      <DialogModel
        open={open}
        setOpen={setOpen}
        className="flex max-h-[90%] min-h-[90%] max-w-[80%] flex-col justify-between"
      >
        <DialogHeader>
          <DialogTitle>Add Products</DialogTitle>
        </DialogHeader>

        <div className="h-[450px] max-h-[75%] overflow-hidden">
          <DataGrid
            dataSourceApi="../../../../api/getVendorProducts"
            onSelection={(ids) => setSelectedProductIds(ids)}
            initialSelectionModel={selectedProductIds}
            apiBodyOpts={{ getDraftProducts: false }}
            maxSelections={maxSelections}
            columnDefination={columns}
            mockRow={mockRow}
            noFilters
            count={20}
          />
        </div>

        <div className="flex w-full justify-end gap-3">
          <ShadButton variant={"ghost"} onClick={() => setOpen(false)}>
            Cancel
          </ShadButton>
          <Button
            onClick={() => {
              setOpen(false);
              onAddProducts(selectedProductIds as string[]);
            }}
          >
            Add Products
          </Button>
        </div>
      </DialogModel>
    </>
  );
};
