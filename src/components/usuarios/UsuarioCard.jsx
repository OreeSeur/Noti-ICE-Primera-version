import { Link } from "react-router-dom";

import {
Pencil,
Trash2,
} from "lucide-react";

export const UsuarioCard = ({
usuario,
onDelete,
}) => {
return (
<article className=" bg-white dark:bg-slate-800 rounded-xl shadow-md p-4 " >
<div className="space-y-2">
<h3 className="font-bold text-lg text-slate-800 dark:text-white">
{usuario.nombre}
</h3>

    <p className="text-slate-600 dark:text-slate-300 break-all">
      {usuario.correo ||
        usuario.email ||
        "Sin correo"}
    </p>

    <p>
      <span className="font-medium">
        Boleta:
      </span>{" "}
      {usuario.boleta || "-"}
    </p>

    <p>
      <span className="font-medium">
        Carrera:
      </span>{" "}
      {usuario.carrera || "-"}
    </p>

    <p>
      <span className="font-medium">
        Semestre:
      </span>{" "}
      {usuario.semestre || "-"}
    </p>

    <div>
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
    </div>
  </div>

  <div className="flex gap-3 mt-4">
    <Link
      to={`/admin/usuarios/editar/${usuario.id}`}
      className="
        flex-1
        flex
        justify-center
        items-center
        gap-2
        bg-blue-100
        text-blue-700
        py-2
        rounded-lg
        hover:bg-blue-200
        transition
      "
    >
      <Pencil size={18} />
      Editar
    </Link>

    <button
      onClick={() =>
        onDelete(usuario)
      }
      className="
        flex-1
        flex
        justify-center
        items-center
        gap-2
        bg-red-100
        text-red-700
        py-2
        rounded-lg
        hover:bg-red-200
        transition
        cursor-pointer
      "
    >
      <Trash2 size={18} />
      Eliminar
    </button>
  </div>
</article>

);
};