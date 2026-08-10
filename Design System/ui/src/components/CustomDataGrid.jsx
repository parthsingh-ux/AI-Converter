import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "./Loader";

const CustomDataGrid = ({
  rows = [],
  columns = [],
  loading = false,
  error = null,
  pageSizeOptions = [25, 50, 100],
  toolbarProps = {},
  onRowClick = null,
  paginationOptions = { pageSize: 100, page: 0 },
  rowIdField = "id",
  getRowId,
}) => {
  const resolvedGetRowId =
    getRowId ||
    ((row) => {
      return row[rowIdField];
    });

  return (
    <div className="w-full mb-10 scroll-auto ">
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={resolvedGetRowId}
          
          pageSizeOptions={pageSizeOptions}
          disableRowSelectionOnClick
          pagination={false}
          initialState={{
            pagination: {
              paginationModel: paginationOptions,
            },
          }}
          showToolbar={false}
          columnBufferPx={100}
          
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: {
                debounceMs: 500,
                placeholder: "Search...",
              },
              ...toolbarProps,
            },
          }}
          onRowClick={onRowClick}
          sx={{
            minHeight: screen,
            maxHeight: screen,
            height: "auto",
            "& .MuiDataGrid-cell:focus": {
              outline: "none",
            },
            "& .MuiDataGrid-cell:focus-within": {
              outline: "none",
            },
            "& .MuiDataGrid-footerContainer": {
  display: "none",
},
          }}
        />
      )}
    </div>
  );
};

export default CustomDataGrid;
