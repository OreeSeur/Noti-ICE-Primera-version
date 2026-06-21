import { Link } from "react-router-dom";

import { avisos } from "../data/avisos";
import { InfoCard } from "../components/cards/InfoCard";

export const Avisos = () => {
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
        Avisos
      </h1>

      <p
        className="
          text-slate-500
          dark:text-slate-400
          mb-8
        "
      >
        Avisos y comunicados recientes de ESIME Zacatenco.
      </p>

      <div className="space-y-4">
        {avisos.map((aviso) => (
          <Link
            key={aviso.id}
            to={`/avisos/${aviso.id}`}
            className="block"
          >
            <InfoCard
              title={aviso.titulo}
              subtitle={aviso.fecha}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};