import { Link } from "react-router-dom";

import { useDocumentos } from "../context/DocumentosContext";

export const Documentos = () => {
  const { documentos } =
    useDocumentos();

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
        Documentos
      </h1>

      <p
        className="
          text-slate-500
          dark:text-slate-400
          mb-8
        "
      >
        Consulta y descarga documentos importantes.
      </p>

      <div className="grid gap-4">
        {documentos.map(
          (documento) => (
            <Link
              key={documento.id}
              to={`/documentos/${documento.id}`}
            >
              <article
                className="
                  bg-white
                  dark:bg-slate-800
                  p-6
                  rounded-xl
                  shadow-md
                  flex
                  justify-between
                  items-center
                  transition
                  hover:shadow-lg
                  hover:-translate-y-1
                "
              >
                <div>
                  <h2
                    className="
                      font-semibold
                      text-lg
                      text-slate-800
                      dark:text-white
                    "
                  >
                    {documento.nombre}
                  </h2>

                  <p
                    className="
                      text-slate-500
                      dark:text-slate-400
                      text-sm
                    "
                  >
                    {documento.tipo}
                    {" • "}
                    {documento.fecha}
                  </p>
                </div>

                <span
                  className="
                    text-[#6A0032]
                    font-semibold
                  "
                >
                  Ver
                </span>
              </article>
            </Link>
          )
        )}
      </div>
    </section>
  );
};