import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = ({ type = "success", message }) => {
    const id = Date.now();

    const newToast = {
      id,
      type,
      message,
    };

    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) =>
        prev.filter((t) => t.id !== id)
      );
    }, 3000);
  };

  const success = (msg) =>
    addToast({ type: "success", message: msg });

  const error = (msg) =>
    addToast({ type: "error", message: msg });

  const warning = (msg) =>
    addToast({ type: "warning", message: msg });

  return (
    <ToastContext.Provider
      value={{ success, error, warning }}
    >
      {children}

      {/* UI GLOBAL */}
      <div className="fixed top-5 right-5 space-y-3 z-[9999]">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`
              px-4 py-3 rounded-lg shadow-md text-white min-w-[220px]
              ${
                toast.type === "success"
                  ? "bg-green-600"
                  : toast.type === "error"
                  ? "bg-red-600"
                  : "bg-yellow-500"
              }
            `}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);