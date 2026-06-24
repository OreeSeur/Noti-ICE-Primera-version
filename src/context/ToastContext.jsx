import { createContext, useContext, useState } from "react";
import { crearId } from "../utils/id";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = "success") => {
    const id = crearId();

    setToasts((prev) => [
      ...prev,
      {
        id,
        message,
        type,
      },
    ]);

    setTimeout(() => {
      setToasts((prev) =>
        prev.filter((toast) => toast.id !== id)
      );
    }, 3000);
  };

  const removeToast = (id) => {
    setToasts((prev) =>
      prev.filter((toast) => toast.id !== id)
    );
  };

  return (
    <ToastContext.Provider
      value={{
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}

      <div className="fixed top-5 right-5 z-[9999] space-y-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`
              px-4
              py-3
              rounded-lg
              shadow-lg
              text-white
              font-medium
              animate-pulse
              ${
                toast.type === "error"
                  ? "bg-red-600"
                  : "bg-green-600"
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
