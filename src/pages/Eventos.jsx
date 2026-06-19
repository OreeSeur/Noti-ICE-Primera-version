import { Link } from "react-router-dom";

import { eventos } from "../data/eventos";

import { InfoCard } from "../components/cards/InfoCard";

export const Eventos = () => {
  return (
    <section>
      <h1 className="text-4xl font-bold text-slate-800 mb-2">
        Eventos
      </h1>

      <p className="text-slate-500 mb-8">
        Próximas actividades y eventos de ESIME.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        {eventos.map((evento) => (
          <Link
            key={evento.id}
            to={`/eventos/${evento.id}`}
            className="block"
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