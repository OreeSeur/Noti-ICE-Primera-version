import { avisos } from "../../data/avisos";
import { eventos } from "../../data/eventos";
import { documentos } from "../../data/documentos";

export const WelcomeCard = () => {
  return (
    <section
      className="
        bg-white
        dark:bg-slate-800
        rounded-xl
        shadow-md
        p-6
        mb-8
      "
    >
      <h2
        className="
          text-2xl
          font-bold
          text-slate-800
          dark:text-white
        "
      >
        Hola Leonardo 👋
      </h2>

      <p
        className="
          mt-2
          text-slate-500
          dark:text-slate-400
        "
      >
        Bienvenido al Portal Académico ESIME.
      </p>

      <div
        className="
          mt-5
          flex
          flex-wrap
          gap-6
        "
      >
        <span className="font-medium">
          📢 {avisos.length} avisos activos
        </span>

        <span className="font-medium">
          🏆 {eventos.length} eventos próximos
        </span>

        <span className="font-medium">
          📄 {documentos.length} documentos publicados
        </span>
      </div>
    </section>
  );
};