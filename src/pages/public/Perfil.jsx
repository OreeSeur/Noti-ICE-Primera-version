import {
  User,
  Mail,
  GraduationCap,
  BookOpen,
  BadgeCheck,
} from "lucide-react";

import { useAuth } from "../../context/auth/useAuth";


export const Perfil = () => {
  
  const { user } = useAuth();
  if (!user) {
    return null;
  }
  const usuario = user;

  return (
    <section>
      {/* Encabezado */}
      <div className="mb-8">
        <h1
          className="
            text-3xl
            font-bold
            text-slate-800
            dark:text-white
          "
        >
          Mi Perfil
        </h1>

        <p
          className="
            text-slate-500
            dark:text-slate-400
            mt-2
          "
        >
          Información académica y personal
        </p>
      </div>

      {/* Tarjeta principal */}
      <div
        className="
          bg-white
          dark:bg-slate-800
          rounded-2xl
          shadow-md
          p-8
          mb-8
        "
      >
        <div
          className="
            flex
            flex-col
            md:flex-row
            items-center
            gap-8
          "
        >
          {/* Avatar */}
          <div
            className="
              w-32
              h-32
              rounded-full
              bg-[#6A0032]
              flex
              items-center
              justify-center
              text-white
            "
          >
            <User size={60} />
          </div>

          {/* Datos */}
          <div className="flex-1">
            <h2
              className="
                text-2xl
                font-bold
                text-slate-800
                dark:text-white
                mb-2
              "
            >
              {usuario.nombre}
            </h2>

            <p
              className="
                text-slate-500
                dark:text-slate-400
              "
            >
              {usuario.correo}
            </p>

            <span
              className="
                inline-block
                mt-4
                bg-green-100
                text-green-700
                px-4
                py-2
                rounded-full
                text-sm
                font-medium
              "
            >
              {usuario.rol}
            </span>
          </div>
        </div>
      </div>

      {/* Información académica */}
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-4
          gap-6
        "
      >
        <article
          className="
            bg-white
            dark:bg-slate-800
            rounded-xl
            shadow-md
            p-6
          "
        >
          <div className="flex items-center gap-3 mb-3">
            <BadgeCheck size={22} />
            <h3 className="font-semibold">
              Boleta
            </h3>
          </div>

          <p
            className="
              text-slate-600
              dark:text-slate-300
            "
          >
            {usuario.boleta}
          </p>
        </article>

        <article
          className="
            bg-white
            dark:bg-slate-800
            rounded-xl
            shadow-md
            p-6
          "
        >
          <div className="flex items-center gap-3 mb-3">
            <GraduationCap size={22} />
            <h3 className="font-semibold">
              Carrera
            </h3>
          </div>

          <p
            className="
              text-slate-600
              dark:text-slate-300
            "
          >
            {usuario.carrera}
          </p>
        </article>

        <article
          className="
            bg-white
            dark:bg-slate-800
            rounded-xl
            shadow-md
            p-6
          "
        >
          <div className="flex items-center gap-3 mb-3">
            <BookOpen size={22} />
            <h3 className="font-semibold">
              Semestre
            </h3>
          </div>

          <p
            className="
              text-slate-600
              dark:text-slate-300
            "
          >
            {usuario.semestre}
          </p>
        </article>

        <article
          className="
            bg-white
            dark:bg-slate-800
            rounded-xl
            shadow-md
            p-6
          "
        >
          <div className="flex items-center gap-3 mb-3">
            <Mail size={22} />
            <h3 className="font-semibold">
              Correo
            </h3>
          </div>

          <p
            className="
              text-slate-600
              dark:text-slate-300
              break-all
            "
          >
            {usuario.correo}
          </p>
        </article>
      </div>
    </section>
  );
};