import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <section
      className="
        flex
        flex-col
        items-center
        justify-center
        text-center
        py-20
      "
    >
      <h1
        className="
          text-8xl
          font-bold
          text-[#6A0032]
        "
      >
        404
      </h1>

      <h2
        className="
          text-3xl
          font-semibold
          mt-4
          text-slate-800
          dark:text-white
        "
      >
        Página no encontrada
      </h2>

      <p
        className="
          mt-3
          text-slate-500
          dark:text-slate-400
          max-w-md
        "
      >
        La página que intentas visitar no existe
        o fue movida a otra ubicación.
      </p>

      <Link
        to="/"
        className="
          mt-8
          bg-[#6A0032]
          text-white
          px-6
          py-3
          rounded-xl
          hover:opacity-90
          transition
        "
      >
        Volver al Inicio
      </Link>
    </section>
  );
};