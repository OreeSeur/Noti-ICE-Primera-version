import { useMemo, useState } from "react";
import { Plus } from "lucide-react";

import { AdminTableWrapper } from "../../../components/common/AdminTableWrapper";
import { CrudActions } from "../../../components/common/CrudActions";
import { EmptyState } from "../../../components/common/EmptyState";
import { PageHeader } from "../../../components/common/PageHeader";
import { SearchInput } from "../../../components/common/SearchInput";
import { StatusBadge } from "../../../components/common/StatusBadge";
import { ConfirmModal } from "../../../components/ui/ConfirmModal";
import { ROUTES, buildRoute } from "../../../constants/routes";
import { useDocumentos } from "../../../context/documentos/useDocumentos";
import { matchesSearch } from "../../../utils/search";

const obtenerTituloDocumento = (documento) =>
  documento.titulo || documento.nombre || "Documento sin título";

export const AdminDocumentos = () => {
  const { documentos, eliminarDocumento } = useDocumentos();

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [documentoSeleccionado, setDocumentoSeleccionado] = useState(null);

  const documentosFiltrados = useMemo(
    () =>
      documentos.filter((documento) =>
        matchesSearch(
          documento,
          ["titulo", "nombre", "tipo", "fecha", "categoria"],
          search
        )
      ),
    [documentos, search]
  );

  const abrirModal = (documento) => {
    setDocumentoSeleccionado(documento);
    setModalOpen(true);
  };

  const cerrarModal = () => {
    setModalOpen(false);
    setDocumentoSeleccionado(null);
  };

  const confirmarEliminacion = () => {
    if (!documentoSeleccionado) return;

    eliminarDocumento(documentoSeleccionado.id);
    cerrarModal();
  };

  return (
    <section className="space-y-6">
      <PageHeader
        title="Administración de Documentos"
        description="Gestiona archivos, formatos y documentos publicados."
        actionLabel="Nuevo Documento"
        actionTo={ROUTES.ADMIN_DOCUMENTOS_NUEVO}
        actionIcon={Plus}
      />

      <div className="rounded-xl bg-white p-4 shadow-md dark:bg-slate-800">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Buscar por título, tipo, fecha o categoría..."
        />
      </div>

      <AdminTableWrapper>
        <table className="w-full min-w-[780px]">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-700">
              <th className="p-4 text-left">Título</th>
              <th className="p-4 text-left">Tipo</th>
              <th className="p-4 text-left">Fecha</th>
              <th className="p-4 text-center">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {documentosFiltrados.length === 0 ? (
              <EmptyState
                colSpan={4}
                title="No se encontraron documentos"
                message="Prueba con otra búsqueda o registra un nuevo documento."
              />
            ) : (
              documentosFiltrados.map((documento) => (
                <tr
                  key={documento.id}
                  className="border-b border-slate-200 dark:border-slate-700"
                >
                  <td className="p-4 font-medium text-slate-800 dark:text-white">
                    {obtenerTituloDocumento(documento)}
                  </td>
                  <td className="p-4">
                    <StatusBadge label={documento.tipo || "Documento"} variant="primary" />
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-300">
                    {documento.fecha || "Sin fecha"}
                  </td>
                  <td className="p-4">
                    <CrudActions
                      editTo={buildRoute(ROUTES.ADMIN_DOCUMENTOS_EDITAR, {
                        id: documento.id,
                      })}
                      onDelete={() => abrirModal(documento)}
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
        title="Eliminar Documento"
        message={`¿Deseas eliminar "${
          documentoSeleccionado
            ? obtenerTituloDocumento(documentoSeleccionado)
            : "este documento"
        }"? Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar documento"
        onConfirm={confirmarEliminacion}
        onCancel={cerrarModal}
      />
    </section>
  );
};
