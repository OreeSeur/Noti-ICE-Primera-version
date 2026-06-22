import { Link } from "react-router-dom";
import { Pencil, Trash2, Plus } from "lucide-react";

import { avisos } from "../data/avisos";

export const AdminAvisos = () => {
  const handleDelete = (id) => {
    console.log(
      "Eliminar aviso:",
      id
    );
  };

  return (
    <section>
      {/* Encabezado */}
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
            Administración de Avisos
          </h1>

          <p
            className="
              text-slate-500
              dark:text-slate-400
              mt-2
            "
          >
            Gestiona los avisos publicados
          </p>
        </div>

        <Link
          to="/admin/avisos/nuevo"
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
          Nuevo Aviso
        </Link>
      </div>

      {/* Tabla */}
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
              <th className="text-left p-4">
                Título
              </th>

              <th className="text-left p-4">
                Fecha
              </th>

              <th className="text-center p-4">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody>
            {avisos.map((aviso) => (
              <tr
                key={aviso.id}
                className="
                  border-b
                  border-slate-200
                  dark:border-slate-700
                "
              >
                <td className="p-4">
                  {aviso.titulo}
                </td>

                <td className="p-4">
                  {aviso.fecha}
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
                      to={`/admin/avisos/editar/${aviso.id}`}
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
                        handleDelete(
                          aviso.id
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
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};