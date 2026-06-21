import { Link } from "react-router-dom";

import {
  Megaphone,
  Calendar,
  FileText,
  Trophy,
} from "lucide-react";

export const QuickActions = () => {
  const actions = [
    {
      title: "Avisos",
      icon: Megaphone,
      path: "/avisos",
    },
    {
      title: "Calendario",
      icon: Calendar,
      path: "/calendario",
    },
    {
      title: "Documentos",
      icon: FileText,
      path: "/documentos",
    },
    {
      title: "Eventos",
      icon: Trophy,
      path: "/eventos",
    },
  ];

  return (
    <section className="mb-8">
      <h2
        className="
          text-2xl
          font-bold
          mb-4
          text-slate-800
          dark:text-white
        "
      >
        Accesos Rápidos
      </h2>

      <div
        className="
          grid
          gap-4
          grid-cols-2
          md:grid-cols-4
        "
      >
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              to={action.path}
              className="
                group
                bg-white
                dark:bg-slate-800
                rounded-xl
                p-5
                shadow-md
                flex
                flex-col
                items-center
                gap-3
                hover:-translate-y-1
                hover:shadow-lg
                transition-all
              "
            >
              <Icon
                size={32}
                className="
                  text-[#6A0032]
                  transition-transform
                  duration-300
                  group-hover:scale-110
                  group-hover:rotate-6
                "
              />

              <span
                className="
                  font-semibold
                  text-slate-800
                  dark:text-white
                "
              >
                {action.title}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
};