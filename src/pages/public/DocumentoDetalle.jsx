import {
  Link,
  useParams,
} from "react-router-dom";

import { useDocumentos } from "../../context/documentos/useDocumentos";
import { mismoId } from "../../utils/id";

export const DocumentoDetalle = () => {
  const { id } = useParams();

  const { documentos } =
    useDocumentos();

  const documento =
    documentos.find(
      (item) =>
        mismoId(item.id, id)
    );

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
        <h1
          className="
            text-3xl
            font-bold
            text-slate-800
            dark:text-white
          "
        >
          {documento.nombre}
        </h1>

        <p
          className="
            text-slate-500
            dark:text-slate-400
            mt-3
          "
        >
          📄 {documento.tipo}
        </p>

        <p
          className="
            text-slate-500
            dark:text-slate-400
          "
        >
          📅 {documento.fecha}
        </p>

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

        <button
          className="
            mt-8
            bg-[#6A0032]
            text-white
            px-6
            py-3
            rounded-lg
            hover:opacity-90
            transition
          "
        >
          Descargar Documento
        </button>
      </article>
    </section>
  );
};