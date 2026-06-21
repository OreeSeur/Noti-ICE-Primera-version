export const EventCard = ({
  titulo,
  fecha,
  lugar,
}) => {
  return (
    <article
      className="
        bg-white
        dark:bg-slate-800
        rounded-xl
        shadow-md
        p-5
        hover:shadow-lg
        transition-all
      "
    >
      <h3
        className="
          font-bold
          text-lg
          text-slate-800
          dark:text-white
        "
      >
        {titulo}
      </h3>

      <p
        className="
          text-slate-500
          dark:text-slate-400
          mt-2
        "
      >
        📅 {fecha}
      </p>

      <p
        className="
          text-slate-500
          dark:text-slate-400
        "
      >
        📍 {lugar}
      </p>
    </article>
  );
};