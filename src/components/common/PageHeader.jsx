import { Link } from "react-router-dom";

export const PageHeader = ({
  title,
  description,
  eyebrow,
  actionLabel,
  actionTo,
  actionIcon: ActionIcon,
}) => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:p-6">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#6A0032] via-[#9D2449] to-[#C9A227]" />

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          {eyebrow && (
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#6A0032] dark:text-pink-100">
              {eyebrow}
            </p>
          )}

          <h1 className="text-2xl font-bold text-slate-800 dark:text-white sm:text-3xl">
            {title}
          </h1>

          {description && (
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-500 dark:text-slate-400 sm:text-base">
              {description}
            </p>
          )}
        </div>

        {actionTo && actionLabel && (
          <Link
            to={actionTo}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#6A0032] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:opacity-90 sm:w-fit"
          >
            {ActionIcon && <ActionIcon size={18} />}
            {actionLabel}
          </Link>
        )}
      </div>
    </div>
  );
};
