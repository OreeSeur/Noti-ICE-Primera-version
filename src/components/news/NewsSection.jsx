import { avisos } from "../../data/avisos";

const noticias = [
  {
    id: 1,
    titulo: "Inicio de reinscripciones",
    fecha: "18 Junio 2026",
  },
  {
    id: 2,
    titulo: "Convocatoria de becas",
    fecha: "15 Junio 2026",
  },
  {
    id: 3,
    titulo: "Actualización de horarios",
    fecha: "12 Junio 2026",
  },
];

export const NewsSection = () => {
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold mb-4">
        Noticias Destacadas
      </h2>

      <div className="bg-white rounded-xl shadow-md p-6">
        {noticias.map((noticia) => (
          <article
            key={noticia.id}
            className="
              py-4
              border-b
              last:border-none
            "
          >
            <h3 className="font-semibold">
              {noticia.titulo}
            </h3>

            <p className="text-sm text-slate-500">
              {noticia.fecha}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};