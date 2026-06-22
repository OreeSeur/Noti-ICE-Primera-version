import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAvisos } from "../context/AvisosContext";

export const AdminNuevoAviso = () => {
  const navigate = useNavigate();

  const { agregarAviso } =
    useAvisos();

  const [formData, setFormData] =
    useState({
      titulo: "",
      fecha: "",
      descripcion: "",
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

    agregarAviso(formData);

    navigate("/admin/avisos");
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
        Nuevo Aviso
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
            Título
          </label>

          <input
            type="text"
            name="titulo"
            value={formData.titulo}
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
            required
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
            Fecha
          </label>

          <input
            type="date"
            name="fecha"
            value={formData.fecha}
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
            required
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
            Descripción
          </label>

          <textarea
            rows="6"
            name="descripcion"
            value={
              formData.descripcion
            }
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
            required
          />
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
          Guardar Aviso
        </button>
      </form>
    </section>
  );
};