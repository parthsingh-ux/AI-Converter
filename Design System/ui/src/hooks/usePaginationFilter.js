// hooks/usePaginationFilter.js
import { useState, useMemo, useEffect } from "react";

export const usePaginationFilter = ({
  data,
  searchQuery = "",
  startDate = "",
  endDate = "",
  searchFields = [],
  itemsPerPageOptions = [5, 10, 25, 50, 100],
  defaultRowsPerPage = 10,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const [filteredData, setFilteredData] = useState(data || []);

  useEffect(() => {
    let filtered = [...data];

    // Filter by date
    if (startDate) {
      const sd = new Date(startDate);
      filtered = filtered.filter((item) => new Date(item.createdAt) >= sd);
    }
    if (endDate) {
      const ed = new Date(endDate);
      filtered = filtered.filter((item) => new Date(item.createdAt) <= ed);
    }

    // Search filtering
    const sq = searchQuery.trim().toLowerCase();
    if (sq && searchFields.length) {
      filtered = filtered.filter((item) =>
        searchFields.some((field) =>
          (item[field] || "").toLowerCase().includes(sq)
        )
      );
    }

    setFilteredData(filtered);
    setCurrentPage(1); // reset to page 1 on new filters
  }, [data, searchQuery, startDate, endDate]);

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const currentPageData = useMemo(
    () => filteredData.slice(startIndex, endIndex),
    [filteredData, startIndex, endIndex]
  );

  return {
    currentPage,
    setCurrentPage,
    rowsPerPage,
    setRowsPerPage,
    totalItems,
    totalPages,
    currentPageData,
  };
};
