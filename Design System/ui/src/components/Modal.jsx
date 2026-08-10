import React from "react";
import { ImCross } from "react-icons/im";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
<div className="fixed inset-0 flex justify-center items-center z-[100] bg-primary-50-dark/80 backdrop-blur-sm">

      <div
        className="absolute inset-0"
        onClick={onClose}
      ></div>

      <div className="relative min-w-[35%] bg-white shadow-lg rounded-2xl z-50 flex flex-col">
        <ImCross
          onClick={onClose}
          className="absolute top-6 right-6 text-sm text-muted hover:text-text cursor-pointer"
        />

        <div className="flex flex-1 justify-center items-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
