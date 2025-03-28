import { useState, useEffect } from "react";

const AlertPopup = ({ title, message, type = "success", onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`p-6 rounded-lg shadow-lg text-center text-white ${
          type === "success"
            ? "bg-green-500"
            : type === "error"
            ? "bg-red-500"
            : "bg-yellow-500"
        }`}
      >
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};

export default AlertPopup;
