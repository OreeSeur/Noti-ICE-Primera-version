import { DashboardCard } from "../cards/DashboardCard";
import { avisos } from "../../data/avisos";

export const RecentActivity = () => {
  const items = avisos.slice(0, 3).map((aviso) => ({
    title: aviso.titulo,
    subtitle: aviso.fecha,
    path: `/avisos/${aviso.id}`,
  }));

  return (
    <DashboardCard
      title="Actividad Reciente"
      items={items}
    />
  );
};