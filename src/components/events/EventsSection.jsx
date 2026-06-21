import { EventCard } from "./EventCard";
import { eventos } from "../../data/eventos";

export const EventsSection = () => {
  return (
    <section className="mt-10">
      <h2
        className="
          text-2xl
          font-bold
          mb-4
          text-slate-800
          dark:text-white
        "
      >
        Próximos Eventos
      </h2>

      <div
        className="
          grid
          gap-4
          md:grid-cols-2
        "
      >
        {eventos.map((evento) => (
          <EventCard
            key={evento.id}
            {...evento}
          />
        ))}
      </div>
    </section>
  );
};