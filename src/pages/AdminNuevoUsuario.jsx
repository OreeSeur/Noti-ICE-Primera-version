import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUsuarios } from "../context/UsuariosContext";

export const AdminNuevoUsuario = () => {
  const navigate = useNavigate();

  const { agregarUsuario } =
    useUsuarios();

  const [formData, setFormData] =
    useState({
      nombre: "",
      correo: "",
      password: "",
      rol: "usuario",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    agregarUsuario(formData);

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
        Nuevo Usuario
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
            type="password"
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
          Guardar Usuario
        </button>
      </form>
    </section>
  );
};