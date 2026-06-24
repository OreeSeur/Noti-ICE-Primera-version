import { useMemo, useState } from "react";
import { Plus } from "lucide-react";

import { AdminMobileCard } from "../../../components/common/AdminMobileCard";
import { AdminTableWrapper } from "../../../components/common/AdminTableWrapper";
import { AudienceSummary } from "../../../components/common/AudienceSummary";
import { CrudActions } from "../../../components/common/CrudActions";
import { EmptyState } from "../../../components/common/EmptyState";
import { PageHeader } from "../../../components/common/PageHeader";
import { SearchInput } from "../../../components/common/SearchInput";
import { ConfirmModal } from "../../../components/ui/ConfirmModal";
import { ROUTES, buildRoute } from "../../../constants/routes";
import { useAvisos } from "../../../context/avisos/useAvisos";
import { buildAudienceSearchText } from "../../../utils/audience";
import { matchesSearch } from "../../../utils/search";

export const AdminAvisos = () => {
  const { avisos, eliminarAviso } = useAvisos();

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [avisoSeleccionado, setAvisoSeleccionado] = useState(null);

  const avisosFiltrados = useMemo(
    () =>
      avisos.filter((aviso) =>
        matchesSearch(aviso, ["titulo", "fecha", "categoria", buildAudienceSearchText], search)
      ),
    [avisos, search]
  );

  const abrirModal = (aviso) => {
    setAvisoSeleccionado(aviso);
    setModalOpen(true);
  };

  const cerrarModal = () => {
    setModalOpen(false);
    setAvisoSeleccionado(null);
  };

  const confirmarEliminacion = () => {
    if (!avisoSeleccionado) return;

    eliminarAviso(avisoSeleccionado.id);
    cerrarModal();
  };

  return (
    <section className="space-y-6">
      <PageHeader
        title="Administración de Avisos"
        description="Gestiona los avisos publicados en el portal."
        actionLabel="Nuevo Aviso"
        actionTo={ROUTES.ADMIN_AVISOS_NUEVO}
        actionIcon={Plus}
      />

      <div className="rounded-xl bg-white p-4 shadow-md dark:bg-slate-800">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Buscar por título, fecha o categoría..."
        />
      </div>

      <div className="space-y-4 lg:hidden">
        {avisosFiltrados.length === 0 ? (
          <EmptyState
            title="No se encontraron avisos"
            message="Prueba con otra búsqueda o registra un nuevo aviso."
          />
        ) : (
          avisosFiltrados.map((aviso) => (
            <AdminMobileCard
              key={aviso.id}
              title={aviso.titulo || "Aviso sin título"}
              subtitle={aviso.fecha || "Sin fecha"}
              description={aviso.descripcion}
              badgeLabel="Aviso"
              badgeVariant="primary"
              item={aviso}
              editTo={buildRoute(ROUTES.ADMIN_AVISOS_EDITAR, { id: aviso.id })}
              detailTo={buildRoute(ROUTES.AVISO_DETALLE, { id: aviso.id })}
              onDelete={() => abrirModal(aviso)}
            />
          ))
        )}
      </div>

      <AdminTableWrapper className="hidden lg:block">
        <table className="w-full min-w-[720px]">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-700">
              <th className="p-4 text-left">Título</th>
              <th className="p-4 text-left">Fecha</th>
              <th className="p-4 text-left">Destinatarios</th>
              <th className="p-4 text-center">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {avisosFiltrados.length === 0 ? (
              <EmptyState
                colSpan={4}
                title="No se encontraron avisos"
                message="Prueba con otra búsqueda o registra un nuevo aviso."
              />
            ) : (
              avisosFiltrados.map((aviso) => (
                <tr
                  key={aviso.id}
                  className="border-b border-slate-200 dark:border-slate-700"
                >
                  <td className="p-4 font-medium text-slate-800 dark:text-white">
                    {aviso.titulo || "Aviso sin título"}
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-300">
                    {aviso.fecha || "Sin fecha"}
                  </td>
                  <td className="p-4">
                    <AudienceSummary item={aviso} compact />
                  </td>
                  <td className="p-4">
                    <CrudActions
                      editTo={buildRoute(ROUTES.ADMIN_AVISOS_EDITAR, {
                        id: aviso.id,
                      })}
                      onDelete={() => abrirModal(aviso)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </AdminTableWrapper>

      <ConfirmModal
        isOpen={modalOpen}
        title="Eliminar Aviso"
        message={`¿Deseas eliminar "${
          avisoSeleccionado?.titulo || "este aviso"
        }"? Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar aviso"
        onConfirm={confirmarEliminacion}
        onCancel={cerrarModal}
      />
    </section>
  );
};
