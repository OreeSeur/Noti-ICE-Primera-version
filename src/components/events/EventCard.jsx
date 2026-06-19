export const EventCard = ({
  titulo,
  fecha,
  lugar
}) => {
  return (
    <article
      className="
        bg-white
        rounded-xl
        shadow-md
        p-5
        hover:shadow-lg
        transition-all
      "
    >
      <h3 className="font-bold text-lg">
        {titulo}
      </h3>

      <p className="text-slate-500 mt-2">
        📅 {fecha}
      </p>

      <p className="text-slate-500">
        📍 {lugar}
      </p>
    </article>
  );
};