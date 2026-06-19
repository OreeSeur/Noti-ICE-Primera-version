import { useParams, Link } from "react-router-dom";

import { avisos } from "../data/avisos";

export const AvisoDetalle = () => {
  const { id } = useParams();

  const aviso = avisos.find(
    (item) => item.id === Number(id)
  );

  if (!aviso) {
    return (
      <section>
        <h1 className="text-3xl font-bold">
          Aviso no encontrado
        </h1>

        <Link
          to="/avisos"
          className="
            text-[#6A0032]
            font-semibold
            mt-4
            inline-block
          "
        >
          Volver a Avisos
        </Link>
      </section>
    );
  }

  return (
    <section>
      <Link
        to="/avisos"
        className="
          text-[#6A0032]
          font-semibold
          mb-6
          inline-block
        "
      >
        ← Volver a Avisos
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
          {aviso.titulo}
        </h1>

        <p className="text-slate-500 mt-2">
          {aviso.fecha}
        </p>

        <p className="mt-6 leading-relaxed">
          {aviso.descripcion}
        </p>
      </article>
    </section>
  );
};