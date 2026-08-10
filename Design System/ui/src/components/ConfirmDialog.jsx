import { ImCross } from "react-icons/im";

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  const renderMessages = () => {
    if (Array.isArray(message)) {
      return (
        <ul className="list-disc list-inside text-gray-600 mb-6 space-y-1">
          {message.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      );
    }
    return <p className="text-gray-600 mb-6">{message}</p>;
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-100">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-xl mx-4 bg-white shadow-xl rounded-lg z-50 px-6 py-5">
        <ImCross
          onClick={onClose}
          className="absolute top-3 right-3 text-xl text-gray-600 hover:text-gray-800 cursor-pointer"
        />

        <div className="pt-2">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">{title}</h2>
          {renderMessages()}
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
