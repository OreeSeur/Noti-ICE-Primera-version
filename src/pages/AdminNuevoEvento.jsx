import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useEventos } from "../context/EventosContext";

export const AdminNuevoEvento = () => {
  const navigate = useNavigate();

  const { agregarEvento } = useEventos();

  const [formulario, setFormulario] = useState({
    titulo: "",
    fecha: "",
    lugar: "",
    categoria: "",
    descripcion: "",
  });

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    agregarEvento(formulario);

    navigate("/admin/eventos");
  };

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-slate-800">
          Nuevo Evento
        </h1>

        <p className="text-slate-500">
          Registra un nuevo evento institucional.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="
          bg-white
          rounded-xl
          shadow-md
          p-6
          space-y-4
        "
      >
        <div>
          <label className="block mb-2 font-medium">
            Título
          </label>

          <input
            type="text"
            name="titulo"
            value={formulario.titulo}
            onChange={handleChange}
            className="
              w-full
              border
              rounded-lg
              px-4
              py-2
            "
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Fecha
          </label>

          <input
            type="date"
            name="fecha"
            value={formulario.fecha}
            onChange={handleChange}
            className="
              w-full
              border
              rounded-lg
              px-4
              py-2
            "
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Lugar
          </label>

          <input
            type="text"
            name="lugar"
            value={formulario.lugar}
            onChange={handleChange}
            className="
              w-full
              border
              rounded-lg
              px-4
              py-2
            "
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Categoría
          </label>

          <input
            type="text"
            name="categoria"
            value={formulario.categoria}
            onChange={handleChange}
            className="
              w-full
              border
              rounded-lg
              px-4
              py-2
            "
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Descripción
          </label>

          <textarea
            rows="5"
            name="descripcion"
            value={formulario.descripcion}
            onChange={handleChange}
            className="
              w-full
              border
              rounded-lg
              px-4
              py-2
            "
            required
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="
              bg-blue-600
              text-white
              px-6
              py-2
              rounded-lg
              hover:bg-blue-700
            "
          >
            Guardar
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/eventos")}
            className="
              bg-slate-200
              px-6
              py-2
              rounded-lg
            "
          >
            Cancelar
          </button>
        </div>
      </form>
    </section>
  );
};