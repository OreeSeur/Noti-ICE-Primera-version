import { ArrowLeft, CalendarDays, MapPin } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { AcademicTargetSummary } from "../../components/common/AcademicTargetSummary";
import { AudienceSummary } from "../../components/common/AudienceSummary";
import { EmptyState } from "../../components/common/EmptyState";
import { StatusBadge } from "../../components/common/StatusBadge";
import { useEventos } from "../../context/eventos/useEventos";
import {
  getItemAudience,
  getPriorityLabel,
  getPriorityVariant,
} from "../../utils/audience";
import { mismoId } from "../../utils/id";

export const EventoDetalle = () => {
  const { id } = useParams();
  const { eventos } = useEventos();

  const evento = eventos.find((item) => mismoId(item.id, id));

  if (!evento) {
    return (
      <section className="space-y-6">
        <EmptyState
          icon={CalendarDays}
          title="Evento no encontrado"
          message="El evento pudo haber sido eliminado o la dirección no es correcta."
        />

        <Link
          to="/eventos"
          className="inline-flex items-center gap-2 rounded-xl bg-[#6A0032] px-5 py-3 font-semibold text-white transition hover:opacity-90"
        >
          <ArrowLeft size={18} />
          Volver a Eventos
        </Link>
      </section>
    );
  }

  const audiencia = getItemAudience(evento);

  return (
    <section className="space-y-6">
      <Link
        to="/eventos"
        className="inline-flex items-center gap-2 font-semibold text-[#6A0032] transition hover:gap-3 dark:text-pink-100"
      >
        <ArrowLeft size={18} />
        Volver a Eventos
      </Link>

      <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div className="bg-gradient-to-br from-[#6A0032] via-[#7B1743] to-[#C9A227] p-6 text-white sm:p-8">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <StatusBadge label={evento.categoria || "Evento"} variant="primary" className="bg-white/15 text-white" />
            <StatusBadge
              label={getPriorityLabel(audiencia.prioridad)}
              variant={getPriorityVariant(audiencia.prioridad)}
              className="bg-white/15 text-white"
            />
          </div>

          <h1 className="text-3xl font-bold sm:text-4xl">{evento.titulo}</h1>

          <div className="mt-5 grid gap-3 text-sm text-white/85 sm:grid-cols-2 sm:text-base">
            <p className="inline-flex items-center gap-2">
              <CalendarDays size={18} />
              {evento.fecha || "Sin fecha"}
            </p>
            <p className="inline-flex items-center gap-2">
              <MapPin size={18} />
              {evento.lugar || "Lugar por confirmar"}
            </p>
          </div>
        </div>

        <div className="grid gap-6 p-6 lg:grid-cols-[1fr_320px] sm:p-8">
          <div>
            <h2 className="mb-3 text-lg font-bold text-slate-800 dark:text-white">
              Descripción
            </h2>
            <p className="leading-relaxed text-slate-700 dark:text-slate-300">
              {evento.descripcion}
            </p>
          </div>

          <aside className="space-y-5 rounded-2xl bg-slate-50 p-5 dark:bg-slate-700/60">
            <div>
              <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                Datos académicos
              </h2>
              <AcademicTargetSummary item={evento} />
            </div>

            <div>
              <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                Dirigido a
              </h2>
              <AudienceSummary item={evento} />
            </div>
          </aside>
        </div>
      </article>
    </section>
  );
};
