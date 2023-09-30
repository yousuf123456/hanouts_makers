import React from "react";
import {
  GridToolbarExport,
  GridToolbarQuickFilter,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";

export const CustomGridToolbar = ({ setFilterButtonEl }: any) => {
  return (
    <div className="px-4 py-2">
      <div className="flex justify-between items-center">
        <GridToolbarQuickFilter />

        <div className="mr-8 flex gap-4 items-center">
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </div>
      </div>
    </div>
  );
};
