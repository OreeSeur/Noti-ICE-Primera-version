import { eventos } from "../data/eventos";

export const Calendario = () => {
  return (
    <section>
      <h1 className="text-4xl font-bold text-slate-800 mb-2">
        Calendario
      </h1>

      <p className="text-slate-500 mb-8">
        Próximas fechas importantes.
      </p>

      <div className="bg-white rounded-xl shadow-md p-6">
        {eventos.map((evento) => (
          <div
            key={evento.id}
            className="
              flex
              justify-between
              items-center
              py-4
              border-b
              last:border-none
            "
          >
            <div>
              <h2 className="font-semibold">
                {evento.titulo}
              </h2>

              <p className="text-sm text-slate-500">
                {evento.lugar}
              </p>
            </div>

            <span className="font-medium text-[#6A0032]">
              {evento.fecha}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};