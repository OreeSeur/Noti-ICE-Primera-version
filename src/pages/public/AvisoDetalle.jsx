import { ArrowLeft, Megaphone } from "lucide-react";
import { useParams, Link } from "react-router-dom";

import { AcademicTargetSummary } from "../../components/common/AcademicTargetSummary";
import { AudienceSummary } from "../../components/common/AudienceSummary";
import { EmptyState } from "../../components/common/EmptyState";
import { StatusBadge } from "../../components/common/StatusBadge";
import { useAvisos } from "../../context/avisos/useAvisos";
import {
  getItemAudience,
  getPriorityLabel,
  getPriorityVariant,
} from "../../utils/audience";
import { mismoId } from "../../utils/id";

export const AvisoDetalle = () => {
  const { id } = useParams();
  const { avisos } = useAvisos();

  const aviso = avisos.find((item) => mismoId(item.id, id));

  if (!aviso) {
    return (
      <section className="space-y-6">
        <EmptyState
          icon={Megaphone}
          title="Aviso no encontrado"
          message="El aviso pudo haber sido eliminado o la dirección no es correcta."
        />

        <Link
          to="/avisos"
          className="inline-flex items-center gap-2 rounded-xl bg-[#6F1D46] px-5 py-3 font-semibold text-white transition hover:opacity-90"
        >
          <ArrowLeft size={18} />
          Volver a Avisos
        </Link>
      </section>
    );
  }

  const audiencia = getItemAudience(aviso);

  return (
    <section className="space-y-6">
      <Link
        to="/avisos"
        className="inline-flex items-center gap-2 font-semibold text-[#6F1D46] transition hover:gap-3 dark:text-pink-100"
      >
        <ArrowLeft size={18} />
        Volver a Avisos
      </Link>

      <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div className="relative overflow-hidden bg-gradient-to-br from-[#6F1D46] via-[#750946] to-[#636569] p-6 text-white sm:p-8">
          <div className="pointer-events-none absolute -right-12 -top-16 size-48 rounded-full bg-white/10 blur-3xl" />
          <div className="relative mb-5 flex flex-wrap items-center gap-3">
            <StatusBadge label="Aviso" variant="primary" className="bg-white/15 text-white" />
            <StatusBadge
              label={getPriorityLabel(audiencia.prioridad)}
              variant={getPriorityVariant(audiencia.prioridad)}
              className="bg-white/15 text-white"
            />
          </div>

          <h1 className="relative text-3xl font-black tracking-tight sm:text-4xl">{aviso.titulo}</h1>
          <p className="relative mt-3 text-sm font-medium text-white/85 sm:text-base">
            {aviso.fecha || "Sin fecha"}
          </p>
        </div>

        <div className="grid gap-6 p-6 lg:grid-cols-[1fr_340px] sm:p-8">
          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-5 dark:border-slate-700 dark:bg-slate-900/30">
            <h2 className="mb-3 text-lg font-black text-slate-900 dark:text-white">
              Descripción
            </h2>
            <p className="leading-relaxed text-slate-700 dark:text-slate-300">
              {aviso.descripcion}
            </p>
          </div>

          <aside className="space-y-5 rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900/40">
            <div>
              <h2 className="mb-4 text-xs font-black uppercase tracking-[0.18em] text-[#6F1D46] dark:text-slate-300">
                Datos académicos
              </h2>
              <AcademicTargetSummary item={aviso} />
            </div>

            <div>
              <h2 className="mb-4 text-xs font-black uppercase tracking-[0.18em] text-[#6F1D46] dark:text-slate-300">
                Dirigido a
              </h2>
              <AudienceSummary item={aviso} />
            </div>
          </aside>
        </div>
      </article>
    </section>
  );
};
