import { Inbox } from "lucide-react";

const EmptyStateContent = ({ title, message, icon: Icon = Inbox }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="mb-3 rounded-full bg-slate-100 p-3 text-slate-400 dark:bg-slate-700">
        <Icon size={26} />
      </div>

      <p className="font-semibold text-slate-700 dark:text-slate-200">
        {title}
      </p>

      {message && (
        <p className="mt-1 max-w-md text-sm text-slate-500 dark:text-slate-400">
          {message}
        </p>
      )}
    </div>
  );
};

export const EmptyState = ({
  title = "Sin resultados",
  message,
  icon,
  colSpan,
  className = "",
}) => {
  if (colSpan) {
    return (
      <tr>
        <td colSpan={colSpan} className={`p-8 ${className}`}>
          <EmptyStateContent title={title} message={message} icon={icon} />
        </td>
      </tr>
    );
  }

  return (
    <div
      className={`rounded-xl border border-dashed border-slate-300 bg-white p-8 dark:border-slate-600 dark:bg-slate-800 ${className}`}
    >
      <EmptyStateContent title={title} message={message} icon={icon} />
    </div>
  );
};
