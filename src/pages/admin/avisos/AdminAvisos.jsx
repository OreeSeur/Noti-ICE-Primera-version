import { useMemo, useState } from "react";
import { Plus } from "lucide-react";

import { AdminTableWrapper } from "../../../components/common/AdminTableWrapper";
import { CrudActions } from "../../../components/common/CrudActions";
import { EmptyState } from "../../../components/common/EmptyState";
import { PageHeader } from "../../../components/common/PageHeader";
import { SearchInput } from "../../../components/common/SearchInput";
import { ConfirmModal } from "../../../components/ui/ConfirmModal";
import { ROUTES, buildRoute } from "../../../constants/routes";
import { useAvisos } from "../../../context/avisos/useAvisos";
import { matchesSearch } from "../../../utils/search";

export const AdminAvisos = () => {
  const { avisos, eliminarAviso } = useAvisos();

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [avisoSeleccionado, setAvisoSeleccionado] = useState(null);

  const avisosFiltrados = useMemo(
    () =>
      avisos.filter((aviso) =>
        matchesSearch(aviso, ["titulo", "fecha", "categoria"], search)
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

      <AdminTableWrapper>
        <table className="w-full min-w-[720px]">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-700">
              <th className="p-4 text-left">Título</th>
              <th className="p-4 text-left">Fecha</th>
              <th className="p-4 text-center">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {avisosFiltrados.length === 0 ? (
              <EmptyState
                colSpan={3}
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
