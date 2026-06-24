import { useParams, Link } from "react-router-dom";

import { useAvisos } from "../../context/AvisosContext";
import { mismoId } from "../../utils/id";

export const AvisoDetalle = () => {
  const { id } = useParams();
  const { avisos } = useAvisos();

  const aviso = avisos.find(
    (item) => mismoId(item.id, id)
  );

  if (!aviso) {
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
          {aviso.titulo}
        </h1>

        <p
          className="
            text-slate-500
            dark:text-slate-400
            mt-2
          "
        >
          {aviso.fecha}
        </p>

        <p
          className="
            mt-6
            leading-relaxed
            text-slate-700
            dark:text-slate-300
          "
        >
          {aviso.descripcion}
        </p>
      </article>
    </section>
  );
};
