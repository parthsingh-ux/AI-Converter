"use client";
import { useState, useRef } from "react";
import { IoCloudUploadOutline, IoTrashOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";

export default function UploadModal({ onClose }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const allowedTypes = [
    "text/csv",
    "application/csv",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  const getToken = () => localStorage.getItem("token");

  const uploadFileToServer = async (file, index) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = getToken();
      
      // Set initial uploading state with a small delay to ensure state updates
      setFiles((prev) => {
        const updated = [...prev];
        updated[index] = { ...updated[index], status: "uploading", progress: 0 };
        return updated;
      });

      // Small delay to ensure UI updates before starting upload
      await new Promise(resolve => setTimeout(resolve, 100));

      console.log(`Starting upload for: ${file.name}`);



      console.log(`Upload complete for: ${file.name}`);

      // Mark as successfully uploaded
      setFiles((prev) => {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          status: "uploaded",
          progress: 100,
        };
        return updated;
      });

      toast.success(`${file.name} uploaded successfully!`);
      return true;
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error(`Upload failed for ${file.name}`);
      
      setFiles((prev) => {
        const updated = [...prev];
        updated[index] = { ...updated[index], status: "error", progress: 0 };
        return updated;
      });
      return false;
    }
  };

  const processFiles = (uploadedFiles) => {
    const newFiles = uploadedFiles.map((file) => {
      const fileExt = file.name.split(".").pop().toLowerCase();
      const isValid =
        allowedTypes.includes(file.type) ||
        ["csv", "xls", "xlsx"].includes(fileExt);

      if (!isValid) {
        toast.error(`${file.name} has unsupported format.`);
        return { file, status: "error", progress: 0 };
      }

      return { file, status: "ready", progress: 0 };
    });

    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleFileChange = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    processFiles(uploadedFiles);
  };

  // Drag and drop handlers
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget === e.target) {
      setDragActive(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = [e.dataTransfer.files[0]];
      processFiles(droppedFiles);
      e.dataTransfer.clearData();
    }
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    const readyFiles = files.filter((f) => f.status === "ready");

    if (readyFiles.length === 0) {
      toast.error("No new files to upload");
      return;
    }

    setLoading(true);

    // Upload files sequentially to better track progress
    for (const f of readyFiles) {
      const actualIndex = files.findIndex((file) => file.file === f.file);
      await uploadFileToServer(f.file, actualIndex);
    }

    setLoading(false);

    // Check if all uploaded successfully
    setFiles((prev) => {
      const allUploaded = prev.every((f) => f.status === "uploaded");
      if (allUploaded && prev.length > 0) {
        setTimeout(() => {
          onClose();
          setTimeout(() => {
            window.location.reload();
          }, 300);
        }, 500);
      }
      return prev;
    });
  };

  return (
<>
  {/* Modal */}
  <div className="">
    <div className="bg-content-content1 border border-gray-default-100 rounded-xl p-4 shadow-xl w-[420px] relative">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-primary-950-dark">Upload File</h2>

        <button
          onClick={onClose}
          className="text-2xl p-1 text-gray-default-500 hover:text-gray-default-700 
                   hover:bg-gray-default-100 rounded-full cursor-pointer"
        >
          <RxCross2 />
        </button>
      </div>

      {/* Upload Area */}
      <label
        htmlFor="file-upload"
        className={`cursor-pointer block rounded-lg p-6 text-center border transition-colors
          max-h-[200px] overflow-y-auto 
          ${
            dragActive
              ? "border-primary-600 bg-primary-50"
              : "border-gray-default-200 bg-gray-default-50"
          }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="file-upload"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".csv,.xls,.xlsx"
        />

        <IoCloudUploadOutline className="text-5xl text-primary-600 mx-auto mb-3" />

        <p className="text-gray-default-700">
          Drag & drop files or{" "}
          <span className="text-primary-600 underline">Browse</span>
        </p>

        <p className="text-xs text-gray-default-500 mt-1">
          Supported formats: CSV, XLS, XLSX
        </p>
      </label>

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-5">
          <h3 className="text-sm font-medium text-gray-default-700 mb-2">
            Files ({files.length})
          </h3>

          <div className="flex flex-col space-y-3 border border-gray-default-100 rounded-xl max-h-[180px] overflow-y-auto">

            {files.map((f, i) => (
              <div
                key={i}
                className={`
                  relative w-full border rounded-md p-3 flex items-center justify-between 
                  ${
                    f.status === "error"
                      ? "bg-danger-50 border-danger-100"
                      : f.status === "uploaded"
                      ? "bg-success-50 border-success-100"
                      : f.status === "uploading"
                      ? "bg-primary-50 border-primary-100"
                      : "bg-content-content1 border-gray-default-100"
                  }
                `}
              >
                <div className="flex-1 overflow-hidden pr-2">
                  
                  {/* Filename */}
                  <p
                    className={`text-sm font-medium truncate ${
                      f.status === "error"
                        ? "text-danger-600"
                        : f.status === "uploaded"
                        ? "text-success-600"
                        : "text-gray-default-900"
                    }`}
                    title={f.file.name}
                  >
                    {f.file.name}
                  </p>

                  {/* Size */}
                  <p className="text-xs text-gray-default-500 mt-0.5">
                    {(f.file.size / 1024).toFixed(2)} KB
                  </p>

                  {/* Status */}
                  {f.status === "error" && (
                    <p className="text-xs text-danger-600 mt-1 font-medium">
                      ❌ Unsupported file type
                    </p>
                  )}

                  {f.status === "uploaded" && (
                    <p className="text-xs text-success-600 mt-1 font-medium">
                      ✓ Upload complete
                    </p>
                  )}

                  {f.status === "uploading" && (
                    <p className="text-xs text-primary-600 mt-1 font-medium">
                      Uploading... {f.progress}%
                    </p>
                  )}
                </div>

                {/* Delete button */}
                <button
                  onClick={() => removeFile(i)}
                  disabled={f.status === "uploading"}
                  className={`ml-2 flex-shrink-0 ${
                    f.status === "uploading"
                      ? "text-gray-default-400 cursor-not-allowed"
                      : "text-danger-500 hover:text-danger-600"
                  }`}
                >
                  <IoTrashOutline className="text-xl" />
                </button>

                {/* Progress bar */}
                {f.status === "uploading" && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-default-200 rounded-b-md overflow-hidden">
                    <div
                      className="h-full bg-primary-500 transition-all duration-300 ease-out"
                      style={{ width: `${f.progress}%` }}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        className={`
          mt-6 w-full py-2.5 rounded-md text-white font-medium transition-all duration-200 
          ${
            loading
              ? "bg-primary-300 cursor-not-allowed"
              : "bg-primary hover:bg-primary-600 active:bg-primary-800"
          }
        `}
        onClick={() => {
          if (loading) return;
          if (files.length === 0) fileInputRef.current.click();
          else handleUpload();
        }}
        disabled={loading}
      >
        {loading
          ? "Uploading..."
          : files.length === 0
          ? "Upload File"
          : "Upload Files"}
      </button>
    </div>
  </div>
</>

  );
}