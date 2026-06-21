import { Link } from "react-router-dom";

import { eventos } from "../../data/eventos";

export const UpcomingEvents = () => {
  const proximos = eventos.slice(0, 3);

  return (
    <section
      className="
        bg-white
        dark:bg-slate-800
        rounded-xl
        shadow-md
        p-6
      "
    >
      <h2
        className="
          text-xl
          font-bold
          text-slate-800
          dark:text-white
          mb-4
        "
      >
        Próximos Eventos
      </h2>

      <div className="space-y-4">
        {proximos.map((evento) => (
          <Link
            key={evento.id}
            to={`/eventos/${evento.id}`}
            className="block"
          >
            <h3
              className="
                font-semibold
                text-slate-800
                dark:text-white
              "
            >
              {evento.titulo}
            </h3>

            <p
              className="
                text-sm
                text-slate-500
                dark:text-slate-400
              "
            >
              {evento.fecha}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};