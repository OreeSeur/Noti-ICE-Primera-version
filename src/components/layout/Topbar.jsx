import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Bell,
  Search,
  User,
  Menu,
} from "lucide-react";

import { avisos } from "../../data/avisos";
import { eventos } from "../../data/eventos";
import { documentos } from "../../data/documentos";

export const Topbar = ({
  setMobileOpen,
}) => {
  const [search, setSearch] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);

  const resultados = [
    ...avisos.map((item) => ({
      id: item.id,
      titulo: item.titulo,
      tipo: "Aviso",
      ruta: `/avisos/${item.id}`,
    })),

    ...eventos.map((item) => ({
      id: item.id,
      titulo: item.titulo,
      tipo: "Evento",
      ruta: `/eventos/${item.id}`,
    })),

    ...documentos.map((item) => ({
      id: item.id,
      titulo: item.nombre,
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
      {/* Izquierda */}
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
                      border-b
                      last:border-none
                      hover:bg-slate-100
                      rounded
                      px-2
                    "
                  >
                    <span className="font-semibold">
                      [{item.tipo}]
                    </span>{" "}
                    {item.titulo}
                  </Link>
                ))
              ) : (
                <p className="text-slate-500">
                  Sin resultados
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Derecha */}
      <div className="flex items-center gap-6">
        <div className="relative">
          <button
            onClick={() =>
              setShowNotifications(!showNotifications)
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
                shadow-lg
                rounded-lg
                p-4
                z-50
              "
            >
              <h3 className="font-bold mb-3">
                Notificaciones
              </h3>

              {avisos.map((aviso) => (
                <div
                  key={aviso.id}
                  className="
                    py-2
                    border-b
                    last:border-none
                  "
                >
                  {aviso.titulo}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <User size={20} />

          <span className="font-medium">
            Leonardo
          </span>
        </div>
      </div>
    </header>
  );
};