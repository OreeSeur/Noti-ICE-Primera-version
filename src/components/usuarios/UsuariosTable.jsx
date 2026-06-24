import { Link } from "react-router-dom";

import {
Pencil,
Trash2,
} from "lucide-react";

export const UsuariosTable = ({
usuarios,
onDelete,
}) => {
return (
<div className="hidden lg:block bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden">
<table className="w-full">
<thead>
<tr className="bg-slate-100 dark:bg-slate-700">
<th className="p-4 text-left">
Nombre
</th>

        <th className="p-4 text-left">
          Correo
        </th>

        <th className="p-4 text-left">
          Boleta
        </th>

        <th className="p-4 text-left">
          Carrera
        </th>

        <th className="p-4 text-left">
          Semestre
        </th>

        <th className="p-4 text-left">
          Rol
        </th>

        <th className="p-4 text-center">
          Acciones
        </th>
      </tr>
    </thead>

    <tbody>
      {usuarios.length === 0 ? (
        <tr>
          <td
            colSpan="7"
            className="text-center p-8 text-slate-500"
          >
            No se encontraron
            usuarios.
          </td>
        </tr>
      ) : (
        usuarios.map(
          (usuario) => (
            <tr
              key={usuario.id}
              className="border-b border-slate-200 dark:border-slate-700"
            >
              <td className="p-4">
                {usuario.nombre}
              </td>

              <td className="p-4">
                {usuario.correo ||
                  usuario.email ||
                  "Sin correo"}
              </td>

              <td className="p-4">
                {usuario.boleta ||
                  "-"}
              </td>

              <td className="p-4">
                {usuario.carrera ||
                  "-"}
              </td>

              <td className="p-4">
                {usuario.semestre ||
                  "-"}
              </td>

              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    usuario.rol ===
                    "admin"
                      ? "bg-green-100 text-green-700"
                      : usuario.rol ===
                        "editor"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {usuario.rol}
                </span>
              </td>

              <td className="p-4">
                <div className="flex justify-center gap-3">
                  <Link
                    to={`/admin/usuarios/editar/${usuario.id}`}
                    className="p-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                  >
                    <Pencil
                      size={18}
                    />
                  </Link>

                  <button
                    onClick={() =>
                      onDelete(
                        usuario
                      )
                    }
                    className="p-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition cursor-pointer"
                  >
                    <Trash2
                      size={18}
                    />
                  </button>
                </div>
              </td>
            </tr>
          )
        )
      )}
    </tbody>
  </table>
</div>

);
};