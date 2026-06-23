import { useState } from "react";
import { Link } from "react-router-dom";

import { Pencil, Trash2, Plus } from "lucide-react";

import { useUsuarios } from "../context/UsuariosContext";
import { ConfirmModal } from "../components/ui/ConfirmModal";

export const AdminUsuarios = () => {
  const { usuarios, eliminarUsuario } = useUsuarios();

  const [busqueda, setBusqueda] = useState("");
  const [filtroRol, setFiltroRol] = useState("todos");

  const [modalOpen, setModalOpen] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  const usuariosFiltrados = usuarios.filter((usuario) => {
    const coincideBusqueda =
      usuario.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      usuario.email.toLowerCase().includes(busqueda.toLowerCase());

    const coincideRol =
      filtroRol === "todos" ? true : usuario.rol === filtroRol;

    return coincideBusqueda && coincideRol;
  });

  const abrirModal = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setModalOpen(true);
  };

  const cerrarModal = () => {
    setModalOpen(false);
    setUsuarioSeleccionado(null);
  };

  const confirmarEliminacion = () => {
    if (!usuarioSeleccionado) return;

    eliminarUsuario(usuarioSeleccionado.id);
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
            Gestiona los usuarios registrados
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

      {/* Filtros */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Buscar usuario..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="flex-1 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 bg-white dark:bg-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-[#6A0032]"
          />

          <select
            value={filtroRol}
            onChange={(e) => setFiltroRol(e.target.value)}
            className="border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 bg-white dark:bg-slate-700 dark:text-white"
          >
            <option value="todos">Todos</option>
            <option value="admin">Administradores</option>
            <option value="usuario">Usuarios</option>
          </select>
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-700">
              <th className="p-4 text-left">Nombre</th>
              <th className="p-4 text-left">Correo</th>
              <th className="p-4 text-left">Rol</th>
              <th className="p-4 text-center">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {usuariosFiltrados.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-8 text-slate-500">
                  No se encontraron usuarios.
                </td>
              </tr>
            ) : (
              usuariosFiltrados.map((usuario) => (
                <tr
                  key={usuario.id}
                  className="border-b border-slate-200 dark:border-slate-700"
                >
                  <td className="p-4">{usuario.nombre}</td>

                  <td className="p-4">{usuario.email}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        usuario.rol === "admin"
                          ? "bg-green-100 text-green-700"
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
                        <Pencil size={18} />
                      </Link>

                      <button
                        onClick={() => abrirModal(usuario)}
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
        title="Eliminar Usuario"
        message={`¿Deseas eliminar a ${usuarioSeleccionado?.nombre}? Esta acción no se puede deshacer.`}
        onConfirm={confirmarEliminacion}
        onCancel={cerrarModal}
      />
    </section>
  );
};