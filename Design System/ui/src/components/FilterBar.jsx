import React, { useEffect, useState } from "react";
import InputBase from "@mui/material/InputBase";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Icon } from "@iconify/react";
import { RxCross2 } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";

const ProjectFilters = ({
  searchQuery,
  setSearchQuery,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  showCustomize,
  setShowCustomize,

  // Column Visibility Props
  columnsVisibility = {},
  handleColumnToggle = () => {},
  clearAllColumns = () => {},
  columnLabels = {},

  // NEW props to control visibility
  showSearch = true,
  showDateFilters = true,
  showCustomizeButton = true,
  searchPlaceholder = "Search file",
}) => {
  const searchWidthClass =
    showDateFilters && showCustomizeButton
      ? "lg:w-3/5"
      : showDateFilters
      ? "lg:w-4/5"
      : !showDateFilters && showCustomizeButton
      ? "lg:w-[calc(100%-190px)]"
      : "lg:w-full";

  const filterCustomizeWidthClass =
    showDateFilters && showCustomizeButton
      ? "lg:w-2/5"
      : showDateFilters
      ? "lg:w-1/5"
      : showCustomizeButton
      ? "lg:w-auto"
      : "lg:w-0";

  const [tempColumnsVisibility, setTempColumnsVisibility] = useState({});

  useEffect(() => {
    if (showCustomize) {
      setTempColumnsVisibility({ ...columnsVisibility });
    }
  }, [showCustomize, columnsVisibility]);

  const handleTempToggle = (columnName) => {
    setTempColumnsVisibility((prev) => ({
      ...prev,
      [columnName]: !prev[columnName],
    }));
  };

  const allSelected = Object.keys(columnLabels).length > 0 && Object.values(tempColumnsVisibility).every(Boolean);

  const handleSelectAll = () => {
    const updated = {};
    const selectAll = !allSelected;
    Object.keys(columnLabels).forEach((key) => {
      updated[key] = selectAll;
    });
    setTempColumnsVisibility(updated);
  };

  // Function to apply the changes (Triggers parent handler for final state update)
  const applyColumnChanges = () => {
    Object.keys(columnLabels).forEach((col) => {
      if (tempColumnsVisibility[col] !== columnsVisibility[col]) {
        handleColumnToggle(col); // Parent component logic handles the actual column prop update
      }
    });
    setShowCustomize(false);
  };

  // Function to reset the temp state and close the modal (Cancel)
  const cancelColumnChanges = () => {
    setTempColumnsVisibility({ ...columnsVisibility }); // Reset to live state
    setShowCustomize(false);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between gap-3 w-full">
        {/* Search Input */}
        {showSearch && (
          <div
            className={`
              flex items-center rounded-lg px-3 h-[40px] w-full 
              ${searchWidthClass}
              focus-within:border-[var(--color-gray-default-900-dark)] 
              focus-within:[&>svg]:text-[var(--color-gray-default-900-dark)]
              `}
            style={{ border: `1px solid var(--color-gray-default-100)` }}
          >
            <IoIosSearch
              className="mr-3 text-[var(--color-gray-default-500)]"
              size={20}
            />
            <InputBase
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
              sx={{
                fontSize: 15,
                color: "var(--color-gray-default-500)",
                "&::placeholder": {
                  color: "var(--color-gray-default-500)",
                },
              }}
              inputProps={{ "aria-label": "Search projects" }}
            />
          </div>
        )}

        {/* Date Filters & Customize Button */}
        {(showDateFilters || showCustomizeButton) && (
          <div
            className={`flex flex-col sm:flex-row gap-2 justify-end w-full ${filterCustomizeWidthClass}`}
          >
            {showDateFilters && (
              <>
                <TextField
                  type="date"
                  label="Start Date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: "40px",
                      borderRadius: "8px",
                      "& fieldset": {
                        borderColor: "var(--color-gray-default-100) !important",
                      },
                      "&:hover fieldset": {
                        borderColor: "var(--color-gray-default-100) !important",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "var(--color-gray-default-900-dark) !important",
                      }
                    },
                    "& input": {
                      fontSize: "12px",
                      color: "var(--color-gray-default-500)",
                    },
                    "& label": {
                      color: "var(--color-gray-default-500)",
                      "&.Mui-focused": {
                        color: "var(--color-gray-default-900-dark)",
                      }
                    },
                  }}
                />

                <TextField
                  type="date"
                  label="End Date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: "40px",
                      borderRadius: "8px",
                      "& fieldset": {
                        borderColor: "var(--color-gray-default-100) !important",
                      },
                      "&:hover fieldset": {
                        borderColor: "var(--color-gray-default-100) !important",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "var(--color-gray-default-900-dark) !important",
                      }
                    },
                    "& input": {
                      fontSize: "12px",
                      color: "var(--color-gray-default-500)",
                    },
                    "& label": {
                      color: "var(--color-gray-default-500)",
                      "&.Mui-focused": {
                        color: "var(--color-gray-default-900-dark)",
                      }
                    },
                  }}
                />
              </>
            )}

            {showCustomizeButton && (
              <Button
                variant="outlined"
                onClick={() => setShowCustomize(true)}
                sx={{
                  height: "40px",
                  borderRadius: "8px",
                  textTransform: "none",
                  color: "var(--color-gray-default-500)",
                  borderColor: "var(--color-gray-default-100)",
                  fontSize: "12px",
                  minWidth: "180px",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  "&:hover": {
                    borderColor: "var(--color-gray-default-100)",
                    color: "var(--color-gray-default-900-dark)",
                  },
                }}
              >
                <Icon
                  icon="solar:cloud-download-linear"
                  width="24"
                  height="24"
                />
                <h2>Customize Columns</h2>
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Customize Modal */}
      {showCustomize && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl min-w-[500px]">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-[var(--color-gray-default-100)]">
              <h2 className="text-lg font-semibold text-[var(--color-gray-default-500)]">
                Customize Columns
              </h2>
              <RxCross2
                size={30}
                onClick={cancelColumnChanges}
                className="top-3 right-3 text-2xl bg-secondary-background p-1 text-[var(--color-gray-default-500)] hover:text-[var(--color-gray-default-900-dark)] hover:bg-border-default rounded-full cursor-pointer"
              />
            </div>

            {/* Checkboxes */}
            <div className="p-4 pb-6">
              <div className="grid grid-cols-3 gap-x-4 gap-y-3">
                {Object.keys(columnLabels).map((columnName) => (
                  <label
                    key={columnName}
                    className="flex items-center gap-2 cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      checked={!!tempColumnsVisibility[columnName]}
                      onChange={() => handleTempToggle(columnName)}
                      className="peer hidden"
                    />
                    <div
                      className="w-4 h-4 flex items-center justify-center rounded border peer-checked:border-[var(--color-gray-default-900-dark)]"
                      style={{ borderColor: `var(--color-gray-default-100)` }}
                      aria-hidden="true"
                    >
                      <svg
                        className="w-3 h-3 text-[var(--color-gray-default-900-dark)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                          visibility: tempColumnsVisibility[columnName]
                            ? "visible"
                            : "hidden",
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span
                      className={`text-sm ${
                        tempColumnsVisibility[columnName]
                          ? "text-[var(--color-gray-default-900-dark)]"
                          : "text-[var(--color-gray-default-500)]"
                      }`}
                    >
                      {columnLabels[columnName] || columnName}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-between p-4 border-t border-[var(--color-gray-default-100)]">
              <div className="flex gap-3">
                <Button
                  variant="outlined"
                  onClick={handleSelectAll}
                  sx={{
                    height: "40px",
                    borderRadius: "8px",
                    textTransform: "none",
                    color: "var(--color-gray-default-500)",
                    borderColor: "var(--color-gray-default-100)",
                    "&:hover": {
                      color: "var(--color-gray-default-900-dark)",
                      borderColor: "var(--color-gray-default-900-dark)",
                    },
                  }}
                >
                  {allSelected ? "Deselect All" : "Select All"}
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    clearAllColumns(); // Clears main state
                    setTempColumnsVisibility({}); // Clears temp state to match
                  }}
                  sx={{
                    height: "40px",
                    borderRadius: "8px",
                    textTransform: "none",
                    color: "var(--color-gray-default-500)",
                    borderColor: "var(--color-gray-default-100)",
                    "&:hover": {
                      color: "var(--color-gray-default-900-dark)",
                      borderColor: "var(--color-gray-default-900-dark)",
                    },
                  }}
                >
                  Clear All
                </Button>
              </div>

              {/* Apply and Cancel Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outlined"
                  onClick={cancelColumnChanges}
                  sx={{
                    height: "40px",
                    borderRadius: "8px",
                    textTransform: "none",
                    color: "var(--color-gray-default-500)",
                    borderColor: "var(--color-gray-default-100)",
                    "&:hover": {
                      color: "var(--color-gray-default-900-dark)",
                      borderColor: "var(--color-gray-default-900-dark)",
                    },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={applyColumnChanges}
                  sx={{
                    height: "40px",
                    borderRadius: "8px",
                    textTransform: "none",
                    backgroundColor: "var(--color-gray-default-900-dark)",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "var(--color-gray-default-500)",
                    },
                  }}
                >
                  Apply Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectFilters;

// import React, { useEffect, useState } from "react";
// import InputBase from "@mui/material/InputBase";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import { RxCross2 } from "react-icons/rx";
// import { IoIosSearch } from "react-icons/io";
// import { CustomizeIcon } from "./CustomIcons";

// const ProjectFilters = ({
//   searchQuery,
//   setSearchQuery,
//   startDate,
//   setStartDate,
//   endDate,
//   setEndDate,
//   showCustomize,
//   setShowCustomize,
//   filteredColumns = [],
//   columnsVisibility = {},
//   handleColumnToggle = () => {},
//   clearAllColumns = () => {},
//   columnLabels = {},
//   showSearch = true,
//   showDateFilters = true,
//   showCustomizeButton = true,
//   searchPlaceholder = "Search by SPON, Partner, Account, Platform",
// }) => {
//   const [tempColumnsVisibility, setTempColumnsVisibility] = useState({});

//   useEffect(() => {
//     if (showCustomize) {
//       setTempColumnsVisibility({ ...columnsVisibility });
//     }
//   }, [showCustomize]);

//   return (
//     <>

//       <div
//         className="
//           flex flex-nowrap items-center justify-between
//           gap-3 w-full h-[40px]
//         "
//       >

//         {showSearch && (
//           <div
//             className="flex items-center rounded-lg px-3 h-full flex-[3]"
//             style={{ border: `1px solid var(--color-subtext-muted)` }}
//           >
//             <IoIosSearch
//               className="mr-3 text-[var(--color-text-muted)]"
//               size={20}
//             />
//             <InputBase
//               placeholder={searchPlaceholder}
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full"
//               sx={{
//                 fontSize: 15,
//                 color: "var(--color-text-muted)",
//                 "&::placeholder": {
//                   color: "var(--color-text-muted)",
//                 },
//               }}
//               inputProps={{ "aria-label": "Search projects" }}
//             />
//           </div>
//         )}

//         {showDateFilters && (
//           <TextField
//             type="date"
//             label="Start"
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//             InputLabelProps={{ shrink: true }}
//             sx={{
//               flex: 1,
//               "& .MuiOutlinedInput-root": {
//                 height: "40px",
//                 borderRadius: "8px",
//               },
//               "& input": {
//                 fontSize: "12px",
//                 color: "var(--color-text-muted)",
//               },
//               "& label": { color: "var(--color-text-muted)" },
//             }}
//           />
//         )}

//         {showDateFilters && (
//           <TextField
//             type="date"
//             label="End"
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//             InputLabelProps={{ shrink: true }}
//             sx={{
//               flex: 1,
//               "& .MuiOutlinedInput-root": {
//                 height: "40px",
//                 borderRadius: "8px",
//               },
//               "& input": {
//                 fontSize: "12px",
//                 color: "var(--color-text-muted)",
//               },
//               "& label": { color: "var(--color-text-muted)" },
//             }}
//           />
//         )}

//         {showCustomizeButton && (
//           <Button
//   variant="outlined"
//   onClick={() => setShowCustomize(true)}
//   sx={{
//     flex: 1,
//     height: "40px",
//     borderRadius: "8px",
//     textTransform: "none",
//     color: "var(--color-text-main)",
//     borderColor: "var(--color-subtext-muted)",
//     fontSize: "12px",
//     whiteSpace: "nowrap",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: "6px",
//     "&:hover": {
//       borderColor: "var(--color-text-muted)",
//       color: "var(--color-text-muted)",
//     },
//   }}
// >
//   <CustomizeIcon size={18} stroke="currentColor" viewBox={"0 0 20 20"} />

//   <span>
//     <span className="block lg:hidden">Customize</span>
//     <span className="hidden lg:block">Customize Columns</span>
//   </span>
// </Button>

//         )}
//       </div>

//       {showCustomize && (
//         <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
//           <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
//             {/* Header */}
//             <div className="flex justify-between items-center p-4 border-b border-gray-200">
//               <h2 className="text-lg font-semibold text-text-main">
//                 Customize Columns
//               </h2>
//               <RxCross2
//                 size={28}
//                 onClick={() => setShowCustomize(false)}
//                 className="text-text-muted hover:text-text-main cursor-pointer"
//               />
//             </div>

//             <div className="px-4 py-4 max-h-[60vh] overflow-y-auto">
//               <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                 {Object.keys(columnLabels).map((columnName) => (
//                   <label
//                     key={columnName}
//                     className="flex items-center gap-2 cursor-pointer select-none"
//                   >
//                     <input
//                       type="checkbox"
//                       checked={columnsVisibility[columnName]}
//                       onChange={() => handleColumnToggle(columnName)}
//                       className="peer hidden"
//                     />
//                     <div
//                       className="w-4 h-4 flex items-center justify-center rounded border border-gray-400 peer-checked:border-button-active"
//                       aria-hidden="true"
//                     >
//                       <svg
//                         className="w-3 h-3 text-button-active"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                         xmlns="http://www.w3.org/2000/svg"
//                         style={{
//                           visibility: columnsVisibility[columnName]
//                             ? "visible"
//                             : "hidden",
//                         }}
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M5 13l4 4L19 7"
//                         />
//                       </svg>
//                     </div>
//                     <span
//                       className={`text-sm ${
//                         columnsVisibility[columnName]
//                           ? "text-button-active"
//                           : "text-gray-700"
//                       }`}
//                     >
//                       {columnLabels[columnName] || columnName}
//                     </span>
//                   </label>
//                 ))}
//               </div>
//             </div>

//             <div className="flex justify-between px-4 pb-4">
//               <button
//                 onClick={() => {
//                   Object.keys(columnLabels).forEach((col) => {
//                     if (!columnsVisibility[col]) handleColumnToggle(col);
//                   });
//                 }}
//                 className="py-2 px-4 border border-gray-300 text-text-muted rounded-md hover:bg-gray-100"
//               >
//                 Select All
//               </button>

//               <button
//                 onClick={clearAllColumns}
//                 className="py-2 px-4 border border-gray-300 text-text-muted rounded-md hover:bg-gray-100"
//               >
//                 Clear All
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ProjectFilters;
