import { avisos } from "../data/avisos";

export const Avisos = () => {
  return (
    <section>
      <h1 className="text-4xl font-bold text-slate-800 mb-2">
        Avisos
      </h1>

      <p className="text-slate-500 mb-8">
        Avisos y comunicados recientes de ESIME Zacatenco.
      </p>

      <div className="space-y-4">
        {avisos.map((aviso) => (
          <article
            key={aviso.id}
            className="
              bg-white
              p-6
              rounded-xl
              shadow-md
            "
          >
            <h2 className="text-xl font-semibold">
              {aviso.titulo}
            </h2>

            <p className="text-slate-500 mt-2">
              {aviso.fecha}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};