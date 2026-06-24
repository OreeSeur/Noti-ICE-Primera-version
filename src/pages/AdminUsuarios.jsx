import { useState } from "react";
import { Link } from "react-router-dom";

import { Plus } from "lucide-react";

import { useUsuarios } from "../context/UsuariosContext";
import { ConfirmModal } from "../components/ui/ConfirmModal";

import { UsuariosFilters } from "../components/usuarios/UsuariosFilters";
import { UsuarioCard } from "../components/usuarios/UsuarioCard";
import { UsuariosTable } from "../components/usuarios/UsuariosTable";

export const AdminUsuarios = () => {
const { usuarios, eliminarUsuario } =
useUsuarios();

const [busqueda, setBusqueda] =
useState("");

const [filtroRol, setFiltroRol] =
useState("todos");

const [modalOpen, setModalOpen] =
useState(false);

const [
usuarioSeleccionado,
setUsuarioSeleccionado,
] = useState(null);

const usuariosFiltrados =
usuarios.filter((usuario) => {
const coincideBusqueda =
usuario.nombre
.toLowerCase()
.includes(
busqueda.toLowerCase()
) ||
(usuario.correo || "")
.toLowerCase()
.includes(
busqueda.toLowerCase()
) ||
(usuario.boleta || "")
.toLowerCase()
.includes(
busqueda.toLowerCase()
);

  const coincideRol =
    filtroRol === "todos"
      ? true
      : usuario.rol ===
        filtroRol;

  return (
    coincideBusqueda &&
    coincideRol
  );
});

const abrirModal = (
usuario
) => {
setUsuarioSeleccionado(
usuario
);
setModalOpen(true);
};

const cerrarModal = () => {
setModalOpen(false);
setUsuarioSeleccionado(
null
);
};

const confirmarEliminacion =
() => {
if (
!usuarioSeleccionado
)
return;

  eliminarUsuario(
    usuarioSeleccionado.id
  );

  cerrarModal();
};

return (
<section>
{/* Encabezado */}
<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
<div>
<h1 className="text-3xl font-bold text-slate-800 dark:text-white">
Administración de Usuarios
</h1>

      <p className="text-slate-500 dark:text-slate-400 mt-2">
        Gestiona los usuarios
        registrados
      </p>
    </div>

    <Link
      to="/admin/usuarios/nuevo"
      className="flex items-center gap-2 bg-[#6A0032] text-white px-5 py-3 rounded-lg hover:opacity-90 transition w-fit"
    >
      <Plus size={18} />
      Nuevo Usuario
    </Link>
  </div>

  <UsuariosFilters
    busqueda={busqueda}
    setBusqueda={
      setBusqueda
    }
    filtroRol={filtroRol}
    setFiltroRol={
      setFiltroRol
    }
  />

  {/* Vista móvil */}
  <div className="lg:hidden space-y-4">
    {usuariosFiltrados.length ===
    0 ? (
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 text-center text-slate-500">
        No se encontraron
        usuarios.
      </div>
    ) : (
      usuariosFiltrados.map(
        (usuario) => (
          <UsuarioCard
            key={
              usuario.id
            }
            usuario={
              usuario
            }
            onDelete={
              abrirModal
            }
          />
        )
      )
    )}
  </div>

  {/* Vista escritorio */}
  <UsuariosTable
    usuarios={
      usuariosFiltrados
    }
    onDelete={
      abrirModal
    }
  />

  <ConfirmModal
    isOpen={modalOpen}
    title="Eliminar Usuario"
    message={`¿Deseas eliminar a ${usuarioSeleccionado?.nombre}? Esta acción no se puede deshacer.`}
    onConfirm={
      confirmarEliminacion
    }
    onCancel={cerrarModal}
  />
</section>

);
};