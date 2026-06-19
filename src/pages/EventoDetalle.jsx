import { Link, useParams } from "react-router-dom";

import { eventos } from "../data/eventos";

export const EventoDetalle = () => {
  const { id } = useParams();

  const evento = eventos.find(
    (item) => item.id === Number(id)
  );

  if (!evento) {
    return (
      <section>
        <h1 className="text-3xl font-bold">
          Evento no encontrado
        </h1>

        <Link
          to="/eventos"
          className="
            text-[#6A0032]
            font-semibold
            mt-4
            inline-block
          "
        >
          Volver a Eventos
        </Link>
      </section>
    );
  }

  return (
    <section>
      <Link
        to="/eventos"
        className="
          text-[#6A0032]
          font-semibold
          mb-6
          inline-block
        "
      >
        ← Volver a Eventos
      </Link>

      <article
        className="
          bg-white
          p-8
          rounded-xl
          shadow-md
        "
      >
        <h1 className="text-3xl font-bold">
          {evento.titulo}
        </h1>

        <p className="text-slate-500 mt-3">
          📅 {evento.fecha}
        </p>

        <p className="text-slate-500">
          📍 {evento.lugar}
        </p>

        <p className="mt-6 leading-relaxed">
          {evento.descripcion}
        </p>
      </article>
    </section>
  );
};