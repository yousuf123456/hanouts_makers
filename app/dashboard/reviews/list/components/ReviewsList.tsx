"use client";
import { DataGrid } from "@/app/dashboard/products/list/components/DataGrid";
import { FaSmile, FaMeh, FaFrown } from "react-icons/fa";
import { RatingStars } from "@/app/sharedComponents/RatingStars";
import { GridColDef } from "@mui/x-data-grid/models/colDef/gridColDef";
import { Tooltip } from "@nextui-org/react";
import React, { useState } from "react";
import { ReviewsListActions } from "./ReviewsListActions";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cx } from "class-variance-authority";

interface ReviewsListProps {
  count: number;
}

const productReviewsColumns: GridColDef[] = [
  {
    field: "orderedProductId",
    headerName: "Order ID",
    width: 210,
    headerAlign: "left",
    valueGetter: (params) => {
      return params.row.orderedProductId.$oid;
    },
  },

  {
    field: "review",
    headerName: "Review",
    width: 200,
    headerAlign: "left",
    renderCell: (params) => {
      const toolTipContent = (
        <div className="w-60 bg-white shadow-md rounded-sm p-2">
          <p className="text-sm">{params.row.review}</p>
        </div>
      );

      return (
        <Tooltip content={toolTipContent} closeDelay={0} delay={0}>
          <div
            className="cursor-pointer MuiDataGrid-cellContent"
            role="presentation"
            title={params.row.review}
          >
            {params.row.review}
          </div>
        </Tooltip>
      );
    },
  },
  {
    field: "productId",
    headerName: "Product ID",
    width: 210,
    headerAlign: "left",
    valueGetter: (params) => {
      return params.row.productId.$oid;
    },
  },
  {
    field: "rating",
    headerName: "Rating",
    type: "number",
    width: 100,
    headerAlign: "left",
    renderCell: (params) => {
      return <RatingStars defaultValue={params.row.rating || 0} />;
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
    renderCell: (params) => {
      return <ReviewsListActions reviewId={params.row._id.$oid} />;
    },
  },
];

const storeReviewsColumns: GridColDef[] = [
  {
    field: "orderedProductId",
    headerName: "Order ID",
    width: 210,
    headerAlign: "left",
    valueGetter: (params) => {
      return params.row.orderedProductId.$oid;
    },
  },

  {
    field: "sellerReview",
    headerName: "Review",
    width: 300,
    headerAlign: "left",
    renderCell: (params) => {
      return (
        <div
          className="cursor-pointer MuiDataGrid-cellContent py-3"
          role="presentation"
          title={params.row.sellerReview}
        >
          {params.row.sellerReview}
        </div>
      );
    },
  },
  {
    field: "sellerResponse",
    headerName: "Response",
    width: 100,
    headerAlign: "left",
    renderCell: (params) => {
      const iconCs = "w-8 h-8";
      return params.row.sellerResponse === 1 ? (
        <FaFrown className={cx(iconCs, " text-red-500")} />
      ) : params.row.sellerResponse === 2 ? (
        <FaMeh className={cx(iconCs, "text-yellow-400")} />
      ) : (
        <FaSmile className={cx(iconCs, "text-green-500")} />
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
    renderCell: (params) => {
      return <ReviewsListActions reviewId={params.row._id.$oid} />;
    },
  },
];

const mockRow = [
  {
    _id: { $oid: "1" },
    review: "Loading",
    orderedProductId: { $oid: "Loading" },
    productId: { $oid: "Loading" },
    rating: 0,
    createdAt: new Date(),
  },
];

export const ReviewsList: React.FC<ReviewsListProps> = ({ count }) => {
  const [tabs, setTabs] = useState("product");

  const onTabChange = (value: string) => {
    setTabs(value);
  };

  const serverSorts = [
    tabs === "product"
      ? {
          fieldName: "rating",
          label: "Rating",
        }
      : {
          fieldName: "sellerResponse",
          label: "Response",
        },
    {
      fieldName: "createdAt",
      label: "Created At",
    },
  ];

  return (
    <div className="flex flex-col gap-8 items-center">
      <Tabs
        onValueChange={onTabChange}
        className="w-[400px]"
        defaultValue={tabs}
      >
        <TabsList>
          <TabsTrigger value="product">Product Reviews</TabsTrigger>
          <TabsTrigger value="store">Store Reviews</TabsTrigger>
        </TabsList>
      </Tabs>

      <DataGrid
        dataSourceApi="../../../../api/getVendorReviews"
        columnDefination={
          tabs === "product" ? productReviewsColumns : storeReviewsColumns
        }
        rerenderWithThisState={tabs}
        serverSorts={serverSorts}
        mockRow={mockRow}
        count={count}
        pageSize={1}
      />
    </div>
  );
};
