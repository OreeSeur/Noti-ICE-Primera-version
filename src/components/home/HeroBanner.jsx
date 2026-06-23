import { Link } from "react-router-dom";

export const HeroBanner = () => {
  return (
    <section
      className="
        bg-[#6f1d46]
        text-white
        rounded-2xl
        p-10
        mb-8
      "
    >
      <h2 className="text-4xl font-bold mb-4">
        Portal Académico ESIME
      </h2>

      <p className="text-lg opacity-90 max-w-2xl">
        Consulta avisos, eventos,
        documentos académicos y fechas
        importantes desde un solo lugar.
      </p>

      <Link
        to="/avisos"
        className="
          inline-block
          mt-6
          bg-white
          text-[#6A0032]
          font-semibold
          px-6
          py-3
          rounded-xl
          hover:scale-105
          transition
        "
      >
        Ver Avisos
      </Link>
    </section>
  );
};