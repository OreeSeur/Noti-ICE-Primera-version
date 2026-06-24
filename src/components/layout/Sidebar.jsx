import { useState } from "react";
import { NavLink } from "react-router-dom";

import ipnLogo from "../../assets/images/ipn-logo.webp";
import { useAuth } from "../../context/auth/useAuth";
import { ROUTES } from "../../constants/routes";

import {
  House,
  Megaphone,
  Calendar,
  FileText,
  Trophy,
  ShieldCheck,
  UserRound,
  GraduationCap,
  Bell,
  Menu,
  X,
} from "lucide-react";

export const Sidebar = ({
  mobileOpen,
  setMobileOpen,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  const { user, canAccessAdmin } = useAuth();

  const closeSidebar = () => {
    setMobileOpen(false);
  };


  const menuItems = [
    {
      icon: House,
      label: "Inicio",
      path: ROUTES.HOME,
    },
    {
      icon: Megaphone,
      label: "Avisos",
      path: ROUTES.AVISOS,
    },
    {
      icon: Calendar,
      label: "Calendario",
      path: ROUTES.CALENDARIO,
    },
    {
      icon: FileText,
      label: "Documentos",
      path: ROUTES.DOCUMENTOS,
    },
    {
      icon: Trophy,
      label: "Eventos",
      path: ROUTES.EVENTOS,
    },

    ...(user
      ? [
          {
            icon: Bell,
            label: "Notificaciones",
            path: ROUTES.NOTIFICACIONES,
          },
          {
            icon: UserRound,
            label: "Mi perfil",
            path: ROUTES.PERFIL,
          },
        ]
      : []),

    ...(canAccessAdmin()
      ? [
          {
            icon: ShieldCheck,
            label: "Administración",
            path: ROUTES.ADMIN,
          },
          {
            icon: GraduationCap,
            label: "Académico",
            path: ROUTES.ADMIN_ACADEMICO,
          },
        ]
      : []),
  ];

  return (
    <>
      {/* Overlay móvil */}
      {mobileOpen && (
        <div
          onClick={closeSidebar}
          className="
            fixed
            inset-0
            bg-black/50
            z-40
            lg:hidden
          "
        />
      )}

      <aside
        className={`
          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:translate-x-0
          fixed
          lg:sticky
          top-0
          left-0
          z-50
          lg:z-30
          shrink-0
          self-start

          ${
            collapsed
              ? "w-72 lg:w-24"
              : "w-72 max-w-[86vw] lg:w-64 lg:max-w-none"
          }

          bg-[#6f1d46]
          text-white
          h-[100dvh]
          lg:h-screen
          overflow-y-auto
          overflow-x-hidden
          scrollbar-hidden

          transition-all
          duration-300

          p-4
          sm:p-6
        `}
      >
        {/* Botones */}
        <div className="flex justify-between items-center">
          <button
            onClick={closeSidebar}
            className="lg:hidden"
          >
            <X size={24} />
          </button>

          <button
            onClick={() =>
              setCollapsed(!collapsed)
            }
            className="
              hidden
              lg:block
              ml-auto
              cursor-pointer
            "
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Logo */}
        <div className="flex flex-col items-center mt-6">
          <img
            src={ipnLogo}
            alt="IPN"
            className="mb-4 w-16 sm:w-20"
          />

          {!collapsed && (
            <>
              <h1
                className="
                  text-2xl
                  sm:text-3xl
                  font-bold
                  text-center
                "
              >
                Portal NOTI ICE
              </h1>

              <p
                className="
                  text-sm
                  text-center
                  text-slate-200
                "
              >
                Unidad Zacatenco
              </p>
            </>
          )}
        </div>

        {/* Menú */}
        <nav className="mt-10">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.label}
                to={item.path}
                end={item.path === ROUTES.HOME}
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `
                  flex
                  items-center
                  gap-3
                  p-3
                  sm:p-4
                  rounded-xl
                  mb-3
                  transition-all
                  duration-200

                  ${
                    isActive
                      ? "bg-white text-[#6A0032] font-semibold"
                      : "hover:bg-white/10"
                  }
                  `
                }
              >
                <Icon size={20} />

                {!collapsed && (
                  <span>
                    {item.label}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
};