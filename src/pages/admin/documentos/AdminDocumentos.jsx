import { useState } from "react";
import { Link } from "react-router-dom";

import { Pencil, Trash2, Plus } from "lucide-react";

import { useDocumentos } from "../../../context/documentos/useDocumentos";
import { ConfirmModal } from "../../../components/ui/ConfirmModal";
import { ROUTES } from "../../../constants/routes";

export const AdminDocumentos = () => {
  const { documentos, eliminarDocumento } = useDocumentos();

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [documentoSeleccionado, setDocumentoSeleccionado] = useState(null);

  // 🔥 FILTRO CORREGIDO (seguro + consistente)
  const documentosFiltrados = documentos.filter((documento) => {
    const texto = search.toLowerCase();

    const coincideTitulo = (documento.titulo ?? "")
      .toLowerCase()
      .includes(texto);

    const coincideTipo = (documento.tipo ?? "")
      .toLowerCase()
      .includes(texto);

    const coincideFecha = (documento.fecha ?? "")
      .toLowerCase()
      .includes(texto);

    return coincideTitulo || coincideTipo || coincideFecha;
  });

  const abrirModal = (id) => {
    setDocumentoSeleccionado(id);
    setModalOpen(true);
  };

  const cerrarModal = () => {
    setModalOpen(false);
    setDocumentoSeleccionado(null);
  };

  const confirmarEliminacion = () => {
    eliminarDocumento(documentoSeleccionado);
    cerrarModal();
  };

  return (
    <section>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            Administración de Documentos
          </h1>

          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Gestiona los documentos publicados
          </p>
        </div>

        <Link
          to={ROUTES.ADMIN_DOCUMENTOS_NUEVO}
          className="flex items-center gap-2 bg-[#6A0032] text-white px-5 py-3 rounded-lg hover:opacity-90 transition w-fit"
        >
          <Plus size={18} />
          Nuevo Documento
        </Link>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar documento..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white w-full md:w-80 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A0032] dark:bg-slate-700 dark:border-slate-600 dark:text-white"
        />
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden">
        <table className="w-full">
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
              <tr>
                <td colSpan="4" className="text-center p-8 text-slate-500">
                  No se encontraron documentos.
                </td>
              </tr>
            ) : (
              documentosFiltrados.map((documento) => (
                <tr
                  key={documento.id}
                  className="border-b border-slate-200 dark:border-slate-700"
                >
                  <td className="p-4">{documento.titulo}</td>
                  <td className="p-4">{documento.tipo}</td>
                  <td className="p-4">{documento.fecha}</td>

                  <td className="p-4">
                    <div className="flex justify-center gap-3">
                      <Link
                        to={`/admin/documentos/editar/${documento.id}`}
                        className="p-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                      >
                        <Pencil size={18} />
                      </Link>

                      <button
                        onClick={() => abrirModal(documento.id)}
                        className="p-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition cursor-pointer"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <ConfirmModal
        isOpen={modalOpen}
        title="Eliminar Documento"
        message="¿Deseas eliminar este documento? Esta acción no se puede deshacer."
        onConfirm={confirmarEliminacion}
        onCancel={cerrarModal}
      />
    </section>
  );
};