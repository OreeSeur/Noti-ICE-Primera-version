import { Link } from "react-router-dom";

import { AudienceSummary } from "./AudienceSummary";
import { CrudActions } from "./CrudActions";
import { StatusBadge } from "./StatusBadge";

export const AdminMobileCard = ({
  title,
  subtitle,
  description,
  badgeLabel,
  badgeVariant = "default",
  icon,
  item,
  editTo,
  onDelete,
  detailTo,
  meta = [],
}) => {
  const content = (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            {icon && <span className="text-xl" aria-hidden="true">{icon}</span>}
            {badgeLabel && <StatusBadge label={badgeLabel} variant={badgeVariant} />}
          </div>

          <h3 className="line-clamp-2 text-base font-bold text-slate-900 dark:text-white">
            {title}
          </h3>

          {subtitle && (
            <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">
              {subtitle}
            </p>
          )}

          {description && (
            <p className="mt-2 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
              {description}
            </p>
          )}
        </div>
      </div>

      {meta.length > 0 && (
        <div className="mt-4 grid gap-2 text-sm text-slate-600 dark:text-slate-300">
          {meta.map((itemMeta) => (
            <div key={itemMeta.label} className="flex justify-between gap-3 rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-700/60">
              <span className="font-semibold">{itemMeta.label}</span>
              <span className="text-right">{itemMeta.value}</span>
            </div>
          ))}
        </div>
      )}

      {item && (
        <div className="mt-4 rounded-xl bg-slate-50 p-3 dark:bg-slate-700/60">
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">
            Destinatarios
          </p>
          <AudienceSummary item={item} compact />
        </div>
      )}

      <div className="mt-4 flex items-center justify-between gap-3">
        {detailTo ? (
          <Link
            to={detailTo}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            Ver detalle
          </Link>
        ) : (
          <span />
        )}

        <CrudActions editTo={editTo} onDelete={onDelete} />
      </div>
    </article>
  );

  return content;
};
