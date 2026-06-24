import { useEventos } from "../../context/eventos/useEventos";

export const CalendarGrid = () => {
  const { eventos } = useEventos();
  const diasMes = 31;

  const obtenerDiaEvento = (fecha) => {
    return parseInt(fecha.split(" ")[0]);
  };

  const diasConEventos = eventos.map((evento) => ({
    dia: obtenerDiaEvento(evento.fecha),
    titulo: evento.titulo,
  }));

  return (
    <div
      className="
        bg-white
        dark:bg-slate-800
        rounded-xl
        shadow-md
        p-6
      "
    >
      <h2
        className="
          text-2xl
          font-bold
          mb-6
          text-slate-800
          dark:text-white
        "
      >
        Junio 2026
      </h2>

      <div
        className="
          grid
          grid-cols-7
          gap-2
        "
      >
        {[
          "Lun",
          "Mar",
          "Mié",
          "Jue",
          "Vie",
          "Sáb",
          "Dom",
        ].map((dia) => (
          <div
            key={dia}
            className="
              font-semibold
              text-center
              text-slate-500
              dark:text-slate-400
              py-2
            "
          >
            {dia}
          </div>
        ))}

        {Array.from({ length: diasMes }, (_, i) => {
          const numeroDia = i + 1;

          const evento = diasConEventos.find(
            (e) => e.dia === numeroDia
          );

          return (
            <div
              key={numeroDia}
              className={`
                h-16
                rounded-lg
                border
                flex
                flex-col
                justify-center
                items-center
                text-sm
                transition

                ${
                  evento
                    ? "bg-[#6A0032] text-white border-[#6A0032]"
                    : "border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                }
              `}
            >
              <span className="font-semibold">
                {numeroDia}
              </span>

              {evento && (
                <span
                  className="
                    text-[10px]
                    text-center
                    px-1
                  "
                >
                  📌
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 space-y-2">
        {eventos.map((evento) => (
          <div
            key={evento.id}
            className="
              flex
              gap-3
              text-sm
            "
          >
            <span
              className="
                text-[#6A0032]
                font-bold
              "
            >
              {evento.fecha}
            </span>

            <span
              className="
                text-slate-700
                dark:text-slate-300
              "
            >
              {evento.titulo}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
