import {
  useState,
  useEffect,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { useUsuarios } from "../context/UsuariosContext";

export const AdminEditarUsuario = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const {
    usuarios,
    editarUsuario,
  } = useUsuarios();

  const [formData, setFormData] =
    useState({
      nombre: "",
      correo: "",
      password: "",
      rol: "usuario",
    });

  useEffect(() => {
    const usuario =
      usuarios.find(
        (item) =>
          item.id === Number(id)
      );

    if (usuario) {
      setFormData({
        nombre:
          usuario.nombre,
        correo:
          usuario.correo,
        password:
          usuario.password,
        rol: usuario.rol,
      });
    }
  }, [id, usuarios]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    editarUsuario(
      id,
      formData
    );

    navigate("/admin/usuarios");
  };

  return (
    <section>
      <h1
        className="
          text-3xl
          font-bold
          mb-8
          text-slate-800
          dark:text-white
        "
      >
        Editar Usuario
      </h1>

      <form
        onSubmit={handleSubmit}
        className="
          bg-white
          dark:bg-slate-800
          rounded-xl
          shadow-md
          p-6
          max-w-3xl
        "
      >
        <div className="mb-5">
          <label
            className="
              block
              mb-2
              font-medium
            "
          >
            Nombre
          </label>

          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="
              w-full
              border
              border-slate-300
              dark:border-slate-700
              rounded-lg
              px-4
              py-3
              bg-transparent
            "
          />
        </div>

        <div className="mb-5">
          <label
            className="
              block
              mb-2
              font-medium
            "
          >
            Correo
          </label>

          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            required
            className="
              w-full
              border
              border-slate-300
              dark:border-slate-700
              rounded-lg
              px-4
              py-3
              bg-transparent
            "
          />
        </div>

        <div className="mb-5">
          <label
            className="
              block
              mb-2
              font-medium
            "
          >
            Contraseña
          </label>

          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="
              w-full
              border
              border-slate-300
              dark:border-slate-700
              rounded-lg
              px-4
              py-3
              bg-transparent
            "
          />
        </div>

        <div className="mb-6">
          <label
            className="
              block
              mb-2
              font-medium
            "
          >
            Rol
          </label>

          <select
            name="rol"
            value={formData.rol}
            onChange={handleChange}
            className="
              w-full
              border
              border-slate-300
              dark:border-slate-700
              rounded-lg
              px-4
              py-3
              bg-transparent
            "
          >
            <option value="usuario">
              Usuario
            </option>

            <option value="admin">
              Administrador
            </option>
          </select>
        </div>

        <button
          type="submit"
          className="
            bg-[#6A0032]
            text-white
            px-6
            py-3
            rounded-lg
            hover:opacity-90
            transition
          "
        >
          Actualizar Usuario
        </button>
      </form>
    </section>
  );
};