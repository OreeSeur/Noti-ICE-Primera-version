export const ConfirmModal = ({
  isOpen,
  title,
  message,
  confirmLabel = "Eliminar",
  cancelLabel = "Cancelar",
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-slate-800">
        <h2 className="mb-3 text-xl font-bold text-slate-800 dark:text-white">
          {title}
        </h2>

        <p className="mb-6 text-slate-600 dark:text-slate-300">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg bg-slate-200 px-4 py-2 transition hover:bg-slate-300 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
          >
            {cancelLabel}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
