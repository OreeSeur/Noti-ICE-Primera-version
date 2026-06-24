import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Bell,
  Search,
  User,
  Menu,
  Moon,
  Sun,
  LogOut,
} from "lucide-react";

import { useAuth } from "../../context/auth/useAuth";
import { useAvisos } from "../../context/avisos/useAvisos";
import { useEventos } from "../../context/eventos/useEventos";
import { useDocumentos } from "../../context/documentos/useDocumentos";
import { ROUTES } from "../../constants/routes";
import { getRoleLabel } from "../../constants/roles";

export const Topbar = ({
  setMobileOpen,
  darkMode,
  setDarkMode,
}) => {
  const { user, logout, canAccessAdmin } = useAuth();
  const { avisos } = useAvisos();
  const { eventos } = useEventos();
  const { documentos } = useDocumentos();

  const [search, setSearch] = useState("");

  const [showNotifications, setShowNotifications] =
    useState(false);

  const [showUserMenu, setShowUserMenu] =
    useState(false);

  const resultados = [
    ...avisos.map((item) => ({
      id: item.id,
      titulo: item.titulo ?? "",
      tipo: "Aviso",
      ruta: `/avisos/${item.id}`,
    })),

    ...eventos.map((item) => ({
      id: item.id,
      titulo: item.titulo ?? "",
      tipo: "Evento",
      ruta: `/eventos/${item.id}`,
    })),

    ...documentos.map((item) => ({
      id: item.id,
      titulo: item.titulo ?? item.nombre ?? "",
      tipo: "Documento",
      ruta: `/documentos/${item.id}`,
    })),
  ].filter((item) =>
    item.titulo
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <header
      className="
        bg-white
        dark:bg-slate-800
        text-slate-800
        dark:text-white
        rounded-xl
        shadow-md
        p-4
        flex
        justify-between
        items-center
        gap-4
        mb-8
      "
    >
      {/* ========================= */}
      {/* IZQUIERDA */}
      {/* ========================= */}

      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden"
        >
          <Menu size={24} />
        </button>

        {/* Buscador */}
        <div className="relative w-full max-w-xs md:max-w-sm">
          <div
            className="
              flex
              items-center
              gap-2
              bg-slate-100
              dark:bg-slate-700
              px-4
              py-2
              rounded-lg
            "
          >
            <Search size={18} />

            <input
              type="text"
              placeholder="Buscar..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="
                bg-transparent
                outline-none
                w-full
                text-slate-800
                dark:text-white
              "
            />
          </div>

          {search && (
            <div
              className="
                absolute
                top-14
                left-0
                right-0
                bg-white
                dark:bg-slate-800
                shadow-lg
                rounded-lg
                p-3
                z-50
              "
            >
              {resultados.length > 0 ? (
                resultados.map((item) => (
                  <Link
                    key={`${item.tipo}-${item.id}`}
                    to={item.ruta}
                    onClick={() =>
                      setSearch("")
                    }
                    className="
                      block
                      py-2
                      px-2
                      border-b
                      last:border-none
                      rounded
                      text-slate-800
                      dark:text-slate-200
                      hover:bg-slate-100
                      dark:hover:bg-slate-700
                    "
                  >
                    <span className="font-semibold">
                      [{item.tipo}]
                    </span>{" "}
                    {item.titulo}
                  </Link>
                ))
              ) : (
                <p
                  className="
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  Sin resultados
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ========================= */}
      {/* DERECHA */}
      {/* ========================= */}

      <div className="flex items-center gap-6">

        {/* Dark Mode */}
        <button
          onClick={() =>
            setDarkMode(!darkMode)
          }
          className="
            cursor-pointer
            transition
            hover:scale-110
          "
        >
          {darkMode ? (
            <Sun size={22} />
          ) : (
            <Moon size={22} />
          )}
        </button>

        {/* Notificaciones */}
        <div className="relative">
          <button
            onClick={() =>
              setShowNotifications(
                !showNotifications
              )
            }
            className="relative cursor-pointer"
          >
            <Bell size={22} />

            <span
              className="
                absolute
                -top-2
                -right-2
                bg-red-500
                text-white
                text-xs
                rounded-full
                w-5
                h-5
                flex
                items-center
                justify-center
              "
            >
              {avisos.length}
            </span>
          </button>

          {showNotifications && (
            <div
              className="
                absolute
                right-0
                mt-3
                w-72
                bg-white
                dark:bg-slate-800
                shadow-lg
                rounded-lg
                p-4
                z-50
              "
            >
              <h3
                className="
                  font-bold
                  mb-3
                  text-slate-800
                  dark:text-white
                "
              >
                Notificaciones
              </h3>

              {avisos.map((aviso) => (
                <Link
                  key={aviso.id}
                  to={`/avisos/${aviso.id}`}
                  onClick={() =>
                    setShowNotifications(false)
                  }
                  className="
                    block
                    py-2
                    px-2
                    border-b
                    last:border-none
                    rounded
                    transition
                    text-slate-800
                    dark:text-slate-200
                    hover:bg-slate-100
                    dark:hover:bg-slate-700
                  "
                >
                  {aviso.titulo}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Usuario NO autenticado */}
        {!user && (
          <Link
            to={ROUTES.LOGIN}
            className="
              hidden
              md:flex
              items-center
              gap-2
              bg-[#6A0032]
              text-white
              px-4
              py-2
              rounded-lg
              hover:opacity-90
              transition
            "
          >
            <User size={18} />

            <span>
              Acceder
            </span>
          </Link>
        )}

        {/* Usuario autenticado */}
        {user && (
          <div className="relative">
            <button
              onClick={() =>
                setShowUserMenu(
                  !showUserMenu
                )
              }
              className="
                flex
                items-center
                gap-2
                cursor-pointer
              "
            >
              <User size={20} />

              <div className="text-left">
                <p className="font-semibold">
                  {user.nombre}
                </p>

                <p
                  className="
                    text-xs
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  {getRoleLabel(user.rol)}
                </p>
              </div>
            </button>

            {showUserMenu && (
              <div
                className="
                  absolute
                  right-0
                  mt-3
                  w-56
                  bg-white
                  dark:bg-slate-800
                  rounded-lg
                  shadow-lg
                  p-2
                  z-50
                "
              >
                <Link
                  to={ROUTES.PERFIL}
                  onClick={() =>
                    setShowUserMenu(false)
                  }
                  className="
                    block
                    px-3
                    py-2
                    rounded
                    hover:bg-slate-100
                    dark:hover:bg-slate-700
                  "
                >
                  Mi Perfil
                </Link>
                {canAccessAdmin() && (
                  <Link
                    to={ROUTES.ADMIN}
                    onClick={() =>
                      setShowUserMenu(false)
                    }
                    className="
                      block
                      px-3
                      py-2
                      rounded
                      hover:bg-slate-100
                      dark:hover:bg-slate-700
                    "
                  >
                    Panel Admin
                  </Link>
                )}

                <button
                  onClick={logout}
                  className="
                    w-full
                    flex
                    items-center
                    gap-2
                    px-3
                    py-2
                    rounded
                    hover:bg-red-100
                    text-red-600
                  "
                >
                  <LogOut size={16} />

                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
