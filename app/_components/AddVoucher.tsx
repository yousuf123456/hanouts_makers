"use client";
import React, { useState } from "react";

import { Button } from "@/app/sharedComponents/Button";
import { Button as ShadButton } from "@/components/ui/button";
import { DialogModel } from "@/app/sharedComponents/DialogModel";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { GridColDef } from "@mui/x-data-grid/models/colDef/gridColDef";
import { DataGrid } from "@/app/dashboard/products/list/components/ClientDataGrid";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import { PromoToolsBucketType } from "../types";

import { format } from "date-fns";
import { VoucherStatus } from "../dashboard/sellerVouchers/list/components/VoucherStatus";

const columns: GridColDef[] = [
  {
    field: "voucherName",
    headerName: "Voucher Name",
    width: 200,
    headerAlign: "left",
  },
  {
    field: "radeemDuration",
    headerName: "Radeem Duration",
    width: 200,
    headerAlign: "left",
    valueGetter: (params) => {
      return (
        format(new Date(params.row.startingDate), "M/dd/yy") +
        " - " +
        format(new Date(params.row.endingDate), "M/dd/yy")
      );
    },
  },
  {
    field: "discountOffValue",
    headerName: "Discount",
    width: 120,
    headerAlign: "left",
    valueGetter: (params) => params.row.discountOffValue + " PKR",
  },
  {
    field: "minOrderValue",
    headerName: "Min.Spend",
    width: 120,
    headerAlign: "left",
    valueGetter: (params) => params.row.minOrderValue + " PKR",
  },
  {
    field: "voucherType",
    headerName: "Voucher Type",
    width: 200,
    headerAlign: "left",
  },
  {
    field: "status",
    headerName: "Status",
    headerAlign: "left",
    width: 125,
    renderCell: (params) => {
      return (
        <div className="">
          <VoucherStatus
            endingDate={params.row.endingDate}
            startingDate={params.row.startingDate}
          />
        </div>
      );
    },
  },
];

interface AddVoucherProps {
  maxSelections?: number;
  selectedVouchers: string[];
  onAddVoucher: (ids: string[], bucketId: string) => void;
}

export const AddVoucher: React.FC<AddVoucherProps> = ({
  maxSelections,
  selectedVouchers,
  onAddVoucher,
}) => {
  const [selectedProductIds, setSelectedProductIds] =
    useState<GridRowSelectionModel>(selectedVouchers || []);

  const [open, setOpen] = useState(false);

  let bucketId = "";

  const getDataFromBuckets = (data: PromoToolsBucketType[]) => {
    const vouchers = data
      .map((bucket) => {
        bucketId = bucket._id.$oid;
        return bucket.vouchers;
      })
      .flatMap((innerArray) => innerArray);

    return vouchers;
  };

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)}>
        Add Voucher
      </Button>

      <DialogModel
        open={open}
        setOpen={setOpen}
        className="flex max-h-[90%] min-h-[90%] max-w-[80%] flex-col justify-between"
      >
        <DialogHeader>
          <DialogTitle>Add Voucher</DialogTitle>
        </DialogHeader>

        <div className="h-[450px] max-h-[75%] overflow-hidden">
          <DataGrid
            dataSourceApi="../../../../api/data/getVendorVouchers"
            onSelection={(ids) => setSelectedProductIds(ids)}
            initialSelectionModel={selectedProductIds}
            getDataFromBuckets={getDataFromBuckets}
            dataIsInFormOfBuckets
            apiBodyOpts={{
              fieldsToGet: {
                "vouchers._id": 1,
                "vouchers.voucherName": 1,
                "vouchers.endingDate": 1,
                "vouchers.voucherType": 1,
                "vouchers.startingDate": 1,
                "vouchers.minOrderValue": 1,
                "vouchers.discountOffValue": 1,
              },
            }}
            maxSelections={maxSelections}
            columnDefination={columns}
            pageSize={50}
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
              onAddVoucher(selectedProductIds as string[], bucketId);
            }}
          >
            Add Voucher
          </Button>
        </div>
      </DialogModel>
    </>
  );
};
