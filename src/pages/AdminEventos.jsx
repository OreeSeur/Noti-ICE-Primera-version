import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Pencil,
  Trash2,
  Plus,
} from "lucide-react";

import { useEventos } from "../context/EventosContext";
import { ConfirmModal } from "../components/ui/ConfirmModal";

export const AdminEventos = () => {
  const {
    eventos,
    eliminarEvento,
  } = useEventos();

  const [search, setSearch] =
    useState("");

  const [modalOpen, setModalOpen] =
    useState(false);

  const [eventoSeleccionado,
    setEventoSeleccionado] =
    useState(null);

  const eventosFiltrados =
    eventos.filter((evento) =>
      evento.titulo
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  const abrirModal = (id) => {
    setEventoSeleccionado(id);
    setModalOpen(true);
  };

  const cerrarModal = () => {
    setModalOpen(false);
    setEventoSeleccionado(null);
  };

  const confirmarEliminacion =
    () => {
      eliminarEvento(
        eventoSeleccionado
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
            Administración de Eventos
          </h1>

          <p
            className="
              text-slate-500
              dark:text-slate-400
              mt-2
            "
          >
            Gestiona los eventos publicados
          </p>
        </div>

        <Link
          to="/admin/eventos/nuevo"
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
          Nuevo Evento
        </Link>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar evento..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="
            bg-white
            w-full
            md:w-80
            px-4
            py-3
            border
            border-slate-300
            rounded-lg
            focus:outline-none
            focus:ring-2
            focus:ring-[#6A0032]
            dark:bg-slate-700
            dark:border-slate-600
            dark:text-white
          "
        />
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
                Título
              </th>

              <th className="p-4 text-left">
                Fecha
              </th>

              <th className="p-4 text-left">
                Lugar
              </th>

              <th className="p-4 text-left">
                Categoría
              </th>

              <th className="p-4 text-center">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody>
            {eventosFiltrados.map(
              (evento) => (
                <tr
                  key={evento.id}
                  className="
                    border-b
                    border-slate-200
                    dark:border-slate-700
                  "
                >
                  <td className="p-4">
                    {evento.titulo}
                  </td>

                  <td className="p-4">
                    {evento.fecha}
                  </td>

                  <td className="p-4">
                    {evento.lugar}
                  </td>

                  <td className="p-4">
                    {evento.categoria}
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
                        to={`/admin/eventos/editar/${evento.id}`}
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
                            evento.id
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
        title="Eliminar Evento"
        message="¿Deseas eliminar este evento? Esta acción no se puede deshacer."
        onConfirm={
          confirmarEliminacion
        }
        onCancel={cerrarModal}
      />
    </section>
  );
};