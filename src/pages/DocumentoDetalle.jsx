import { Link, useParams } from "react-router-dom";

import { documentos } from "../data/documentos";

export const DocumentoDetalle = () => {
  const { id } = useParams();

  const documento = documentos.find(
    (item) => item.id === Number(id)
  );

  if (!documento) {
    return (
      <section>
        <h1 className="text-3xl font-bold">
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
          p-8
          rounded-xl
          shadow-md
        "
      >
        <h1 className="text-3xl font-bold">
          {documento.nombre}
        </h1>

        <p className="text-slate-500 mt-3">
          📄 {documento.tipo}
        </p>

        <p className="text-slate-500">
          📅 {documento.fecha}
        </p>

        <p className="mt-6 leading-relaxed">
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