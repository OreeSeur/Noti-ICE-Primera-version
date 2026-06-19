import { documentos } from "../data/documentos";

export const Documentos = () => {
  return (
    <section>
      <h1 className="text-4xl font-bold text-slate-800 mb-2">
        Documentos
      </h1>

      <p className="text-slate-500 mb-8">
        Consulta y descarga documentos importantes.
      </p>

      <div className="grid gap-4">
        {documentos.map((documento) => (
          <article
            key={documento.id}
            className="
              bg-white
              p-6
              rounded-xl
              shadow-md
              flex
              justify-between
              items-center
            "
          >
            <div>
              <h2 className="font-semibold text-lg">
                {documento.nombre}
              </h2>

              <p className="text-slate-500 text-sm">
                {documento.tipo} • {documento.fecha}
              </p>
            </div>

            <button
              className="
                bg-[#6A0032]
                text-white
                px-4
                py-2
                rounded-lg
                hover:opacity-90
              "
            >
              Descargar
            </button>
          </article>
        ))}
      </div>
    </section>
  );
};