import { Link } from "react-router-dom";

import { eventos } from "../data/eventos";

export const Calendario = () => {
  return (
    <section>
      <h1
        className="
          text-4xl
          font-bold
          text-slate-800
          dark:text-white
          mb-2
        "
      >
        Calendario Académico
      </h1>

      <p
        className="
          text-slate-500
          dark:text-slate-400
          mb-8
        "
      >
        Próximos eventos y actividades programadas.
      </p>

      <div className="grid gap-4">
        {eventos.map((evento) => (
          <Link
            key={evento.id}
            to={`/eventos/${evento.id}`}
          >
            <article
              className="
                bg-white
                dark:bg-slate-800
                p-6
                rounded-xl
                shadow-md
                transition
                hover:shadow-lg
                hover:-translate-y-1
              "
            >
              <div
                className="
                  flex
                  flex-col
                  md:flex-row
                  md:items-center
                  md:justify-between
                  gap-3
                "
              >
                <div>
                  <h2
                    className="
                      text-xl
                      font-semibold
                      text-slate-800
                      dark:text-white
                    "
                  >
                    {evento.titulo}
                  </h2>

                  <p
                    className="
                      text-slate-500
                      dark:text-slate-400
                    "
                  >
                    📍 {evento.lugar}
                  </p>
                </div>

                <div
                  className="
                    bg-[#6A0032]
                    text-white
                    px-4
                    py-2
                    rounded-lg
                    text-center
                    font-medium
                  "
                >
                  {evento.fecha}
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
};