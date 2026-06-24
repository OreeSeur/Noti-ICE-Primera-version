import { Link } from "react-router-dom";
import { ROUTES } from "../constants/routes";

import {
  Bell,
  CalendarDays,
  FileText,
  Users,
  Plus,
} from "lucide-react";

import { useAvisos } from "../context/avisos/useAvisos";
import { useEventos } from "../context/eventos/useEventos";
import { useDocumentos } from "../context/documentos/useDocumentos";
import { useUsuarios } from "../context/usuarios/useUsuarios";

export const PanelAdmin = () => {
  const { avisos } = useAvisos();

  const { eventos } = useEventos();

  const { documentos } =
    useDocumentos();

  const { usuarios } =
    useUsuarios();

const actividadReciente = [
  ...avisos.slice(0, 2).map((aviso) => ({
    id: `aviso-${aviso.id}`,
    titulo: aviso.titulo,
    tipo: "Aviso publicado",
  })),

  ...eventos.slice(0, 2).map((evento) => ({
    id: `evento-${evento.id}`,
    titulo: evento.titulo,
    tipo: "Evento creado",
  })),

  ...documentos
    .slice(0, 2)
    .map((documento) => ({
      id: `documento-${documento.id}`,
      titulo: documento.nombre,
      tipo: "Documento agregado",
    })),

  ...usuarios.slice(0, 2).map((usuario) => ({
    id: `usuario-${usuario.id}`,
    titulo: usuario.nombre,
    tipo: "Usuario registrado",
  })),
].slice(0, 8);

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
          Panel de Administración
        </h1>

        <p
          className="
            text-slate-500
            dark:text-slate-400
            mt-2
          "
        >
          Gestión general del portal académico
        </p>
      </div>

      {/* Estadísticas */}
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-6
          mb-8
        "
      >
        <article
          className="
            bg-white
            dark:bg-slate-800
            p-6
            rounded-xl
            shadow-md
          "
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-slate-500">
                Avisos
              </h3>

              <p
                className="
                  text-3xl
                  font-bold
                  mt-2
                "
              >
                {avisos.length}
              </p>
            </div>

            <Bell size={36} />
          </div>
        </article>

        <article
          className="
            bg-white
            dark:bg-slate-800
            p-6
            rounded-xl
            shadow-md
          "
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-slate-500">
                Eventos
              </h3>

              <p
                className="
                  text-3xl
                  font-bold
                  mt-2
                "
              >
                {eventos.length}
              </p>
            </div>

            <CalendarDays size={36} />
          </div>
        </article>

        <article
          className="
            bg-white
            dark:bg-slate-800
            p-6
            rounded-xl
            shadow-md
          "
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-slate-500">
                Documentos
              </h3>

              <p
                className="
                  text-3xl
                  font-bold
                  mt-2
                "
              >
                {documentos.length}
              </p>
            </div>

            <FileText size={36} />
          </div>
        </article>

        <article
          className="
            bg-white
            dark:bg-slate-800
            p-6
            rounded-xl
            shadow-md
          "
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-slate-500">
                Usuarios
              </h3>

              <p
                className="
                  text-3xl
                  font-bold
                  mt-2
                "
              >
                {usuarios.length}
              </p>
            </div>

            <Users size={36} />
          </div>
        </article>
      </div>

      {/* Acciones rápidas */}
      <div
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
            text-xl
            font-bold
            mb-6
          "
        >
          Acciones rápidas
        </h2>

        <div
          className="
            flex
            flex-wrap
            gap-4
          "
        >
          <Link
            to={ROUTES.ADMIN_AVISOS}
            className="
              flex
              items-center
              gap-2
              bg-[#6A0032]
              text-white
              px-5
              py-3
              rounded-lg
              hover:opacity-90
              transition
            "
          >
            <Plus size={18} />
            Gestionar Avisos
          </Link>

          <Link
            to={ROUTES.ADMIN_EVENTOS}
            className="
              flex
              items-center
              gap-2
              bg-[#6A0032]
              text-white
              px-5
              py-3
              rounded-lg
              hover:opacity-90
              transition
            "
          >
            <Plus size={18} />
            Gestionar Eventos
          </Link>

          <Link
            to={ROUTES.ADMIN_DOCUMENTOS}
            className="
              flex
              items-center
              gap-2
              bg-[#6A0032]
              text-white
              px-5
              py-3
              rounded-lg
              hover:opacity-90
              transition
            "
          >
            <Plus size={18} />
            Gestionar Documentos
          </Link>

          <Link
            to={ROUTES.ADMIN_USUARIOS}
            className="
              flex
              items-center
              gap-2
              bg-[#6A0032]
              text-white
              px-5
              py-3
              rounded-lg
              hover:opacity-90
              transition
            "
          >
            <Plus size={18} />
            Gestionar Usuarios
          </Link>
        </div>
      </div>

      {/* Actividad reciente */}
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
            text-xl
            font-bold
            mb-6
          "
        >
          Actividad reciente
        </h2>

        <div className="space-y-4">
          {actividadReciente.map(
            (actividad) => (
              <div
                key={actividad.id}
                className="
                  border-b
                  border-slate-200
                  dark:border-slate-700
                  pb-4
                "
              >
                <h3 className="font-semibold">
                  {actividad.titulo}
                </h3>

                <p
                  className="
                    text-sm
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  {actividad.tipo}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};