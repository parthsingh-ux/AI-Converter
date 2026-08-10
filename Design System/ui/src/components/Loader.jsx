import React from "react";

const Loader = () => {
  return (
      <div className="fixed inset-0 flex items-center justify-center bg-text-main bg-opacity-50 z-50">
          <div className="flex space-x-3">
            <div
              className="w-4 h-4 bg-red-500 rounded-full wave-bounce"
              style={{ animationDelay: "0ms" }}
            ></div>
            <div
              className="w-4 h-4 bg-yellow-400 rounded-full wave-bounce"
              style={{ animationDelay: "150ms" }}
            ></div>
            <div
              className="w-4 h-4 bg-green-500 rounded-full wave-bounce"
              style={{ animationDelay: "300ms" }}
            ></div>
            <div
              className="w-4 h-4 bg-blue-500 rounded-full wave-bounce"
              style={{ animationDelay: "450ms" }}
            ></div>
            <div
              className="w-4 h-4 bg-purple-500 rounded-full wave-bounce"
              style={{ animationDelay: "600ms" }}
            ></div>
          </div>
        </div>
  );
};

export default Loader;

export const LoaderForButton = () => {
  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-6 h-6 border-t-2 border-l-2 border-dotted border-border rounded-full animate-spin"></div>
    </div>
  );
};
