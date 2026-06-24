import { Link } from "react-router-dom";

export const PageHeader = ({
  title,
  description,
  actionLabel,
  actionTo,
  actionIcon: ActionIcon,
}) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          {title}
        </h1>

        {description && (
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            {description}
          </p>
        )}
      </div>

      {actionTo && actionLabel && (
        <Link
          to={actionTo}
          className="flex w-fit items-center gap-2 rounded-lg bg-[#6A0032] px-5 py-3 text-white transition hover:opacity-90"
        >
          {ActionIcon && <ActionIcon size={18} />}
          {actionLabel}
        </Link>
      )}
    </div>
  );
};
