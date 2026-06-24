import { Link } from "react-router-dom";

import { useDocumentos } from "../../context/documentos/useDocumentos";
import {
  formatFileSize,
  getDocumentIcon,
  getDocumentTitle,
} from "../../utils/documentTypes";

export const Documentos = () => {
  const { documentos } = useDocumentos();

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
        Consulta documentos, formatos, imágenes y archivos institucionales.
      </p>

      <div className="grid gap-4">
        {documentos.map((documento) => {
          const titulo = getDocumentTitle(documento);
          const icono = getDocumentIcon(documento.tipo);

          return (
            <Link key={documento.id} to={`/documentos/${documento.id}`}>
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
                  gap-4
                  transition
                  hover:shadow-lg
                  hover:-translate-y-1
                "
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl" aria-hidden="true">
                    {icono}
                  </span>

                  <div>
                    <h2
                      className="
                        font-semibold
                        text-lg
                        text-slate-800
                        dark:text-white
                      "
                    >
                      {titulo}
                    </h2>

                    <p
                      className="
                        text-slate-500
                        dark:text-slate-400
                        text-sm
                      "
                    >
                      {documento.tipo || "Documento"}
                      {" • "}
                      {documento.fecha || "Sin fecha"}
                    </p>

                    {documento.archivoNombre && (
                      <p className="mt-1 text-xs text-slate-400">
                        Archivo: {documento.archivoNombre}
                        {documento.archivoTamaño
                          ? ` • ${formatFileSize(documento.archivoTamaño)}`
                          : ""}
                      </p>
                    )}
                  </div>
                </div>

                <span
                  className="
                    text-[#6A0032]
                    font-semibold
                    shrink-0
                  "
                >
                  Ver
                </span>
              </article>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
