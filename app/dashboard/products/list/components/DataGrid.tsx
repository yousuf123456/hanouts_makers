"use client";
import React, { useEffect, useState } from "react";
import {
  DataGrid as MuiDataGrid,
  GridColDef,
  GridToolbar,
  GridRowHeightParams,
} from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CustomGridToolbar } from "./CustomGridToolbar";
import { SortCard } from "./SortCard";

interface DataGridProps {
  count: number;
  apiBodyOpts?: {};
  serverSorts?: {
    label: string;
    fieldName: string;
  }[];
  mockRow?: {};
  pageSize?: number;
  dataSourceApi: string;
  rerenderWithThisState?: any;
  columnDefination: GridColDef[];
}

export const DataGrid: React.FC<DataGridProps> = ({
  count,
  mockRow,
  pageSize,
  apiBodyOpts,
  serverSorts,
  dataSourceApi,
  columnDefination,
  rerenderWithThisState,
}) => {
  //Server sort null means no server sort
  const [serverSort, setServerSort] = useState<null | { [key: string]: any }>(
    null
  );

  const [cursor, setCursor] = useState<null | string>(null);
  const [tieBreaker, setTieBreaker] = useState<null | string>(null);

  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: pageSize || 5,
  });

  //Set goingNext to null means neither going next or back. Either server sorting the data or at initial stage
  const [goingNext, setGoingNext] = useState<{
    goingNext: boolean | null;
    page: number;
  } | null>(null);

  const { data, refetch, isFetching, isRefetching, isLoading } = useQuery({
    queryKey: ["vendorProducts"],
    queryFn: async () => {
      const { data } = await axios.post(dataSourceApi, {
        ...apiBodyOpts,
        pageSize: paginationModel.pageSize,
        pageNumber: paginationModel.page,
        cursor: cursor,
        //@ts-ignore
        goingNext: goingNext === null ? null : goingNext.goingNext,
        serverSort: serverSort,
        tieBreaker: tieBreaker,
      });

      return data;
    },
  });

  const onPaginationModelChange = (currentPaginationModel: any) => {
    setGoingNext({
      page: currentPaginationModel.page,
      goingNext: currentPaginationModel.page > paginationModel.page,
    });

    setPaginationModel((prev) => currentPaginationModel);
  };

  useEffect(() => {
    setGoingNext({
      //Setting the page in nextGoing object so it will cause the state change and fire the useEffect
      page: Object.values(serverSort || {})[0] * -1,
      goingNext: null,
    });

    setPaginationModel({ page: 0, pageSize: pageSize || 5 });
  }, [serverSort]);

  useEffect(() => {
    if (goingNext === null) return;

    //Checking if the data is being server sorted. If yes setting the cursor to different value so it fires the useEffect. Did not go down bcz it was always setting the same cursor again and again
    if (goingNext.goingNext === null)
      return setCursor(goingNext.page.toString());

    if (data?.length > 0) {
      if (serverSort !== null) {
        const serverSortField = Object.keys(serverSort)[0];
        //Checking if field is createdAt and dealing with it accordingly. {createdAt : {$date : date}}
        const specialCase =
          serverSort[serverSortField] === "createdAt"
            ? goingNext.goingNext
              ? data[data.length - 1].createdAt.$date
              : data[0].createdAt.$date
            : null;

        goingNext.goingNext
          ? setTieBreaker(data[data.length - 1]._id.$oid)
          : setTieBreaker(data[0]._id.$oid);

        return goingNext.goingNext
          ? setCursor(
              specialCase ? specialCase : data[data.length - 1][serverSortField]
            )
          : setCursor(specialCase ? specialCase : data[0][serverSortField]);
      }

      goingNext.goingNext
        ? setCursor(data[data.length - 1]._id.$oid)
        : setCursor(data[0]._id.$oid);
    }
  }, [goingNext]);

  useEffect(() => {
    if (!isRefetching && !isFetching) {
      if (serverSort !== null && goingNext?.goingNext && tieBreaker === null)
        return;

      refetch();
    }
  }, [cursor, tieBreaker]);

  useEffect(() => {
    if (rerenderWithThisState) {
      setServerSort(null);
    }
  }, [rerenderWithThisState]);

  const isMoreThanOnePage = count / paginationModel.pageSize;

  return (
    <div className="w-[966px] flex flex-col gap-4 border-[2px] border-blue-50 rounded-sm">
      {serverSorts && isMoreThanOnePage > 1 && (
        <div className="p-4 w-full flex flex-col gap-3">
          <p className="text-sm font-medium text-black">Server Side Sorts</p>

          <div className="flex gap-3 flex-wrap">
            {serverSorts?.map((sort) => (
              <SortCard
                sort={sort}
                serverSort={serverSort}
                setServerSort={setServerSort}
              />
            ))}
          </div>
        </div>
      )}

      {serverSorts && isMoreThanOnePage > 1 && (
        <div className="w-full h-[1px] bg-slate-200" />
      )}

      <MuiDataGrid
        sx={{
          "& .MuiDataGrid-virtualScroller::-webkit-scrollbar": {
            height: "0.6em",
          },
          "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
          "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb": {
            backgroundColor: "#cbd5e1",
          },
          "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb:hover": {
            background: "#94a3b8",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
            justifyContent: "flex-start",
          },

          "& .MuiCheckbox-root": {
            color: "#0ea5e9",
          },

          "&, [class^=MuiDataGrid]": {
            border: "none",
            zIndex: 0,
          },

          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "white",
          },
          "& .MuiDataGrid-row": {
            zIndex: "0",
            paddingLeft: "4px",
          },

          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "#f0f9ff",
          },

          "& .MuiTablePagination-root": {
            color: "#0ea5e9",
          },

          "& .MuiButtonBase-root:disabled": {
            color: "#0ea5e9",
            opacity: ".4",
          },

          "& .MuiDataGrid-columnHeaders": {
            borderBottom: "none",
            backgroundColor: "#f0f9ff",
            color: "#0ea5e9",
            fontWeight: "1000",
            paddingX: "0px",
          },

          "& .MuiButtonBase-root": {
            color: "#0ea5e9",
          },
        }}
        rows={data || mockRow || []}
        getRowId={(row) => row._id.$oid}
        paginationModel={paginationModel}
        columns={columnDefination}
        rowCount={count}
        disableColumnMenu={true}
        loading={isLoading || isRefetching}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        getRowHeight={() => "auto"}
        checkboxSelection
        pageSizeOptions={[5]}
        paginationMode="server"
        disableRowSelectionOnClick
        slots={{ toolbar: CustomGridToolbar }}
        onPaginationModelChange={onPaginationModelChange}
      />
    </div>
  );
};
