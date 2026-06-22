import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Pencil,
  Trash2,
  Plus,
} from "lucide-react";

import { useDocumentos } from "../context/DocumentosContext";
import { ConfirmModal } from "../components/ui/ConfirmModal";

export const AdminDocumentos = () => {
  const {
    documentos,
    eliminarDocumento,
  } = useDocumentos();

  const [modalOpen, setModalOpen] =
    useState(false);

  const [
    documentoSeleccionado,
    setDocumentoSeleccionado,
  ] = useState(null);

  const abrirModal = (id) => {
    setDocumentoSeleccionado(id);
    setModalOpen(true);
  };

  const cerrarModal = () => {
    setModalOpen(false);
    setDocumentoSeleccionado(null);
  };

  const confirmarEliminacion =
    () => {
      eliminarDocumento(
        documentoSeleccionado
      );

      cerrarModal();
    };

  return (
    <section>
      <div
        className="
          flex
          flex-col
          md:flex-row
          md:items-center
          md:justify-between
          gap-4
          mb-8
        "
      >
        <div>
          <h1
            className="
              text-3xl
              font-bold
              text-slate-800
              dark:text-white
            "
          >
            Administración de Documentos
          </h1>

          <p
            className="
              text-slate-500
              dark:text-slate-400
              mt-2
            "
          >
            Gestiona los documentos publicados
          </p>
        </div>

        <Link
          to="/admin/documentos/nuevo"
          className="
            flex
            items-center
            gap-2
            bg-[#6A0032]
            text-white
            px-5
            py-3
            rounded-lg
            hover:opacity-90
            transition
            w-fit
          "
        >
          <Plus size={18} />
          Nuevo Documento
        </Link>
      </div>

      <div
        className="
          bg-white
          dark:bg-slate-800
          rounded-xl
          shadow-md
          overflow-hidden
        "
      >
        <table className="w-full">
          <thead>
            <tr
              className="
                bg-slate-100
                dark:bg-slate-700
              "
            >
              <th className="p-4 text-left">
                Nombre
              </th>

              <th className="p-4 text-left">
                Tipo
              </th>

              <th className="p-4 text-left">
                Fecha
              </th>

              <th className="p-4 text-center">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody>
            {documentos.map(
              (documento) => (
                <tr
                  key={documento.id}
                  className="
                    border-b
                    border-slate-200
                    dark:border-slate-700
                  "
                >
                  <td className="p-4">
                    {documento.nombre}
                  </td>

                  <td className="p-4">
                    {documento.tipo}
                  </td>

                  <td className="p-4">
                    {documento.fecha}
                  </td>

                  <td className="p-4">
                    <div
                      className="
                        flex
                        justify-center
                        gap-3
                      "
                    >
                      <Link
                        to={`/admin/documentos/editar/${documento.id}`}
                        className="
                          p-2
                          rounded-lg
                          bg-blue-100
                          text-blue-700
                          hover:bg-blue-200
                          transition
                        "
                      >
                        <Pencil size={18} />
                      </Link>

                      <button
                        onClick={() =>
                          abrirModal(
                            documento.id
                          )
                        }
                        className="
                          p-2
                          rounded-lg
                          bg-red-100
                          text-red-700
                          hover:bg-red-200
                          transition
                          cursor-pointer
                        "
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        isOpen={modalOpen}
        title="Eliminar Documento"
        message="¿Deseas eliminar este documento? Esta acción no se puede deshacer."
        onConfirm={
          confirmarEliminacion
        }
        onCancel={cerrarModal}
      />
    </section>
  );
};