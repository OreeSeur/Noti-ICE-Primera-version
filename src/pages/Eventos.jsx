import { useState } from "react";
import { Link } from "react-router-dom";

import { eventos } from "../data/eventos";
import { InfoCard } from "../components/cards/InfoCard";

export const Eventos = () => {
  const [categoria, setCategoria] =
    useState("Todos");

  const categorias = [
    "Todos",
    "Conferencias",
    "Concursos",
    "Ferias",
  ];

  const eventosFiltrados =
    categoria === "Todos"
      ? eventos
      : eventos.filter(
          (evento) =>
            evento.categoria === categoria
        );

  return (
    <section>
      <h1 className="text-4xl font-bold text-slate-800 mb-2">
        Eventos
      </h1>

      <p className="text-slate-500 mb-8">
        Próximas actividades y eventos de ESIME.
      </p>

      {/* Filtros */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() =>
              setCategoria(cat)
            }
            className={`
              px-4
              py-2
              rounded-lg
              transition
              ${
                categoria === cat
                  ? "bg-[#6A0032] text-white"
                  : "bg-white shadow"
              }
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {eventosFiltrados.map((evento) => (
          <Link
            key={evento.id}
            to={`/eventos/${evento.id}`}
          >
            <InfoCard
              title={evento.titulo}
              subtitle={`📅 ${evento.fecha}`}
              description={`📍 ${evento.lugar}`}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};