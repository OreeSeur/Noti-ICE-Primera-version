import { Megaphone } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { InfoCard } from "../../components/cards/InfoCard";
import { AcademicTargetSummary } from "../../components/common/AcademicTargetSummary";
import { EmptyState } from "../../components/common/EmptyState";
import { PageHeader } from "../../components/common/PageHeader";
import { SearchInput } from "../../components/common/SearchInput";
import { StatusBadge } from "../../components/common/StatusBadge";
import { useAvisos } from "../../context/avisos/useAvisos";
import {
  buildAudienceSearchText,
  getItemAudience,
  getPriorityLabel,
  getPriorityVariant,
} from "../../utils/audience";
import { buildAcademicTargetSearchText } from "../../utils/academicTarget";
import { matchesSearch } from "../../utils/search";

export const Avisos = () => {
  const { avisos } = useAvisos();
  const [busqueda, setBusqueda] = useState("");

  const avisosFiltrados = useMemo(
    () =>
      avisos.filter((aviso) =>
        matchesSearch(
          aviso,
          [
            "titulo",
            "descripcion",
            "fecha",
            (item) => getPriorityLabel(getItemAudience(item).prioridad),
            buildAudienceSearchText,
            buildAcademicTargetSearchText,
          ],
          busqueda
        )
      ),
    [avisos, busqueda]
  );

  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Comunicados"
        title="Avisos"
        description="Consulta avisos institucionales, trámites, fechas importantes y comunicados dirigidos a la comunidad de ESIME."
      />

      <SearchInput
        value={busqueda}
        onChange={setBusqueda}
        placeholder="Buscar avisos por título, fecha o prioridad..."
      />

      {avisosFiltrados.length === 0 ? (
        <EmptyState
          icon={Megaphone}
          title="No se encontraron avisos"
          message="Prueba con otra palabra clave o limpia la búsqueda para ver todos los comunicados disponibles."
        />
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {avisosFiltrados.map((aviso) => {
            const audiencia = getItemAudience(aviso);

            return (
              <Link key={aviso.id} to={`/avisos/${aviso.id}`}>
                <InfoCard
                  icon="📢"
                  title={aviso.titulo}
                  subtitle={aviso.fecha || "Sin fecha"}
                  description={aviso.descripcion}
                  metadata={<AcademicTargetSummary item={aviso} compact />}
                  badge={
                    <StatusBadge
                      label={getPriorityLabel(audiencia.prioridad)}
                      variant={getPriorityVariant(audiencia.prioridad)}
                    />
                  }
                />
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
};
