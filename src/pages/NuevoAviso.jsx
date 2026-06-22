import { useState } from "react";

export const NuevoAviso = () => {
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

    console.log(
      "NUEVO AVISO:",
      formData
    );

    alert(
      "Aviso registrado correctamente"
    );

    setFormData({
      titulo: "",
      fecha: "",
      descripcion: "",
    });
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
        Crear Aviso
      </h1>

      <form
        onSubmit={handleSubmit}
        className="
          bg-white
          dark:bg-slate-800
          p-6
          rounded-xl
          shadow-md
          max-w-3xl
        "
      >
        {/* Título */}

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
            value={
              formData.titulo
            }
            onChange={
              handleChange
            }
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

        {/* Fecha */}

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
            value={
              formData.fecha
            }
            onChange={
              handleChange
            }
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

        {/* Descripción */}

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
            rows="5"
            name="descripcion"
            value={
              formData.descripcion
            }
            onChange={
              handleChange
            }
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
          "
        >
          Guardar Aviso
        </button>
      </form>
    </section>
  );
};