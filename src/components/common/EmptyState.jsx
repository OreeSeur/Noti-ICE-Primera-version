import { Inbox } from "lucide-react";

const EmptyStateContent = ({ title, message, icon: Icon = Inbox }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="mb-4 rounded-2xl bg-[#6A0032]/10 p-4 text-[#6A0032] dark:bg-[#6A0032]/30 dark:text-pink-100">
        <Icon size={30} />
      </div>

      <p className="text-lg font-bold text-slate-800 dark:text-white">
        {title}
      </p>

      {message && (
        <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-500 dark:text-slate-400">
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
      className={`rounded-2xl border border-dashed border-slate-300 bg-white/80 p-8 shadow-sm dark:border-slate-600 dark:bg-slate-800/80 ${className}`}
    >
      <EmptyStateContent title={title} message={message} icon={icon} />
    </div>
  );
};
