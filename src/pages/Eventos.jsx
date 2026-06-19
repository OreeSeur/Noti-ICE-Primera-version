import { eventos } from "../data/eventos";

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
          <article
            key={evento.id}
            className="
              bg-white
              p-6
              rounded-xl
              shadow-md
            "
          >
            <h2 className="text-xl font-semibold">
              {evento.titulo}
            </h2>

            <p className="text-slate-500 mt-2">
              📅 {evento.fecha}
            </p>

            <p className="text-slate-500">
              📍 {evento.lugar}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};