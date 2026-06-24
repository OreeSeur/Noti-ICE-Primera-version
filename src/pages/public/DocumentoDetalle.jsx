import { Link, useParams } from "react-router-dom";

import { useDocumentos } from "../../context/documentos/useDocumentos";
import { mismoId } from "../../utils/id";
import {
  formatFileSize,
  getDocumentIcon,
  getDocumentTitle,
} from "../../utils/documentTypes";

export const DocumentoDetalle = () => {
  const { id } = useParams();

  const { documentos } = useDocumentos();

  const documento = documentos.find((item) => mismoId(item.id, id));

  if (!documento) {
    return (
      <section>
        <h1
          className="
            text-3xl
            font-bold
            text-slate-800
            dark:text-white
          "
        >
          Documento no encontrado
        </h1>

        <Link
          to="/documentos"
          className="
            text-[#6A0032]
            font-semibold
            mt-4
            inline-block
          "
        >
          Volver a Documentos
        </Link>
      </section>
    );
  }

  const titulo = getDocumentTitle(documento);
  const icono = getDocumentIcon(documento.tipo);

  return (
    <section>
      <Link
        to="/documentos"
        className="
          text-[#6A0032]
          font-semibold
          mb-6
          inline-block
        "
      >
        ← Volver a Documentos
      </Link>

      <article
        className="
          bg-white
          dark:bg-slate-800
          p-8
          rounded-xl
          shadow-md
        "
      >
        <div className="flex items-start gap-4">
          <span className="text-5xl" aria-hidden="true">
            {icono}
          </span>

          <div>
            <h1
              className="
                text-3xl
                font-bold
                text-slate-800
                dark:text-white
              "
            >
              {titulo}
            </h1>

            <p
              className="
                text-slate-500
                dark:text-slate-400
                mt-3
              "
            >
              Tipo: {documento.tipo || "Documento"}
            </p>

            <p
              className="
                text-slate-500
                dark:text-slate-400
              "
            >
              Fecha: {documento.fecha || "Sin fecha"}
            </p>
          </div>
        </div>

        {documento.archivoNombre && (
          <div className="mt-6 rounded-xl bg-slate-100 p-4 dark:bg-slate-700">
            <p className="font-semibold text-slate-800 dark:text-white">
              Archivo registrado
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {documento.archivoNombre}
              {documento.archivoTamaño
                ? ` • ${formatFileSize(documento.archivoTamaño)}`
                : ""}
            </p>
          </div>
        )}

        <p
          className="
            mt-6
            leading-relaxed
            text-slate-700
            dark:text-slate-300
          "
        >
          {documento.descripcion}
        </p>

        {documento.url ? (
          <a
            href={documento.url}
            target="_blank"
            rel="noreferrer"
            className="
              mt-8
              inline-block
              bg-[#6A0032]
              text-white
              px-6
              py-3
              rounded-lg
              hover:opacity-90
              transition
            "
          >
            Abrir documento
          </a>
        ) : (
          <p className="mt-8 rounded-lg bg-amber-50 p-4 text-sm text-amber-700 dark:bg-amber-900/30 dark:text-amber-200">
            Este documento ya tiene sus datos registrados. La descarga del archivo se conectará cuando exista almacenamiento en backend.
          </p>
        )}
      </article>
    </section>
  );
};
