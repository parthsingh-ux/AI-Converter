"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Pagination from "@/components/PaginationControls";

export default function DataTable({
  title,
  description,
  titleBadge,
  columns = [],
  data = [],
  selectableRows = false,
  renderRowActions,
  page,
  pageSize,
  totalItems,
  pageSizeOptions = [5, 10, 25, 50],
  onPageChange,
  onPageSizeChange,

  // Action Control Props
  showHeaderIcon = true,
  showHeaderActions = true,
  renderHeaderActions,

  // NEW PROP FOR FILTER BAR
  renderFilterBar,

  // Text/Icon Props
  addBtnText = "Add User",
  exportBtnText = "Export",
  headerIconName = "charm:menu-kebab",

  addBtnIconName = "lucide:plus",
  exportBtnIconName = "lucide:download",

  showFilterBar = false,
}) {
  const [selectedIndexes, setSelectedIndexes] = useState([]);

  const totalPages =
    totalItems && pageSize ? Math.ceil(totalItems / pageSize) : 1;

  const toggleRow = (index) => {
    let next = [...selectedIndexes];
    if (next.includes(index)) next = next.filter((i) => i !== index);
    else next.push(index);
    setSelectedIndexes(next);
  };

  const toggleAll = () => {
    if (selectedIndexes.length === data.length) setSelectedIndexes([]);
    else setSelectedIndexes(data.map((_, i) => i));
  };

  const handleSetPage = (value) => {
    onPageChange && onPageChange(value);
  };

  const handleSetRowsPerPage = (value) => {
    onPageSizeChange && onPageSizeChange(value);

    onPageChange && onPageChange(1);
  };

  const rangeFrom =
    !totalItems || totalItems === 0 ? 0 : pageSize * (page - 1) + 1;
  const rangeTo = Math.min(page * pageSize, totalItems || 0);

  const renderDefaultHeaderActions = () => {
    if (showHeaderIcon) {
      return (
        <button className="rounded-full hover:bg-slate-100 text-gray-default-400 p-1">
          <Icon icon={headerIconName} className="w-4 h-4" />
        </button>
      );
    }

    // Default action buttons if headerIcon is false
    return (
      <div className="flex items-center gap-2">
        {/* Button 1: Add User */}
        <button className="px-4 py-2 text-md rounded-xl bg-white text-primary-950-dark border-2 border-gray-default-100 flex items-center gap-1">
          <Icon icon={addBtnIconName} className="w-6 h-6" />
          {addBtnText}
        </button>

        <button className="px-4 py-2 text-md rounded-xl border-2 border-primary bg-primary text-white flex items-center gap-1">
          <Icon icon={exportBtnIconName} className="w-6 h-6" />
          {exportBtnText}
        </button>
      </div>
    );
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm ">
      {/* HEADER */}

      <div className=""></div>
      <div className="flex items-center justify-between p-4 ">
        {/* Title and Description Block (Left Side) */}
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold">{title}</h2>
            {titleBadge && (
              <span className="px-2 py-0.5 rounded-full border border-gray-default-100 bg-primary-50 text-primary-300-dark text-xs">
                {titleBadge}
              </span>
            )}
          </div>
          {description && (
            <p className="text-sm text-slate-500">{description}</p>
          )}
        </div>

        {/* Action Buttons Block (Right Side) */}
        {showHeaderActions &&
          (renderHeaderActions
            ? renderHeaderActions()
            : renderDefaultHeaderActions())}
      </div>

      {renderFilterBar && <div className="px-4 py-4 ">{renderFilterBar()}</div>}
      {/* END FILTER BAR SECTION */}

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100 text-xs text-slate-500">
            <tr>
              {selectableRows && (
                <th className="px-4 py-3 align-middle">
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={
                        data.length > 0 &&
                        selectedIndexes.length === data.length
                      }
                      onChange={toggleAll}
                      className="accent-blue-600"
                    />
                  </div>
                </th>
              )}
              {columns.map((col, i) => (
                <th
                  key={i}
                  className="px-4 text-gray-default-500 py-3 text-left font-semibold "
                >
                  {col.header}
                </th>
              ))}
              {renderRowActions && <th className="px-4 py-3 text-right" />}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {data.map((row, index) => (
              <tr
                key={index}
                className={`transition-colors ${selectedIndexes.includes(index)
        ? "bg-red-50 hover:bg-gray-default-200"
        : "hover:bg-success-50"
    }
  `}
              >
                {selectableRows && (
                  <td className="px-4 py-3 align-middle">
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={selectedIndexes.includes(index)}
                        onChange={() => toggleRow(index)}
                        className="accent-blue-600"
                      />
                    </div>
                  </td>
                )}

                {columns.map((col, i) => (
                  <td key={i} className="px-4 py-3">
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}

                {renderRowActions && (
                  <td className="px-4 py-3 text-right">
                    {renderRowActions(row)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {typeof totalItems === "number" && (
        <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-t border-gray-default-100">
          <Pagination
            total={totalPages}
            page={page}
            onChange={handleSetPage}
            size="md"
            radius="md"
            variant="solid"
            color="primary"
            showGoto
            showItems
            showRange
            itemsPerPage={pageSize}
            itemsPerPageOptions={pageSizeOptions}
            onItemsPerPageChange={handleSetRowsPerPage}
            rangeFrom={rangeFrom}
            rangeTo={rangeTo}
            rangeTotal={totalItems}
          />
        </div>
      )}
    </div>
  );
}
