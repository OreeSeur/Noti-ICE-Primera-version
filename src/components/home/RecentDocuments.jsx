import { DashboardCard } from "../cards/DashboardCard";
import { documentos } from "../../data/documentos";

export const RecentDocuments = () => {
  const items = documentos
    .slice(0, 3)
    .map((documento) => ({
      title: documento.nombre,
      subtitle: documento.tipo,
      path: `/documentos/${documento.id}`,
    }));

  return (
    <DashboardCard
      title="Documentos Recientes"
      items={items}
    />
  );
};