import { Link } from "react-router-dom";

import { avisos } from "../../data/avisos";

export const RecentActivity = () => {
  const recientes = avisos.slice(0, 3);

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
        Actividad Reciente
      </h2>

      <div className="space-y-4">
        {recientes.map((aviso) => (
          <Link
            key={aviso.id}
            to={`/avisos/${aviso.id}`}
            className="
              block
              border-b
              border-slate-200
              dark:border-slate-700
              pb-3
              last:border-none
            "
          >
            <h3
              className="
                font-semibold
                text-slate-800
                dark:text-white
              "
            >
              {aviso.titulo}
            </h3>

            <p
              className="
                text-sm
                text-slate-500
                dark:text-slate-400
              "
            >
              {aviso.fecha}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};