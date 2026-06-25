export const InfoCard = ({
  title,
  subtitle,
  description,
  badge,
  icon,
  actionLabel = "Ver detalle",
  className = "",
  metadata = null,
}) => {
  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#6F1D46]/30 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800 sm:p-6 ${className}`}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#6F1D46] via-[#750946] to-[#636569] opacity-80" />

      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          {icon && (
            <span
              className="mt-1 flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#6F1D46]/10 text-2xl text-[#6F1D46] dark:bg-[#6F1D46]/30 dark:text-pink-100"
              aria-hidden="true"
            >
              {icon}
            </span>
          )}

          <div className="min-w-0">
            <h2 className="line-clamp-2 text-lg font-bold text-slate-800 transition group-hover:text-[#6F1D46] dark:text-white dark:group-hover:text-pink-100 sm:text-xl">
              {title}
            </h2>

            {subtitle && (
              <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {badge && <div className="shrink-0">{badge}</div>}
      </div>

      {description && (
        <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {description}
        </p>
      )}

      {metadata && <div>{metadata}</div>}

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-sm dark:border-slate-700">
        <span className="font-semibold text-[#6F1D46] dark:text-pink-100">
          {actionLabel}
        </span>
        <span className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#6F1D46] dark:text-slate-500 dark:group-hover:text-pink-100">
          →
        </span>
      </div>
    </article>
  );
};
