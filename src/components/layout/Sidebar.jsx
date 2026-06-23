import { useState } from "react";
import { NavLink } from "react-router-dom";

import ipnLogo from "../../assets/images/ipn-logo.webp";

import {
  House,
  Megaphone,
  Calendar,
  FileText,
  Trophy,
  Menu,
  X,
} from "lucide-react";

export const Sidebar = ({
  mobileOpen,
  setMobileOpen,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  const closeSidebar = () => {
    setMobileOpen(false);
  };

  const menuItems = [
    {
      icon: House,
      label: "Inicio",
      path: "/",
    },
    {
      icon: Megaphone,
      label: "Avisos",
      path: "/avisos",
    },
    {
      icon: Calendar,
      label: "Calendario",
      path: "/calendario",
    },
    {
      icon: FileText,
      label: "Documentos",
      path: "/documentos",
    },
    {
      icon: Trophy,
      label: "Eventos",
      path: "/eventos",
    },
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
          lg:relative
          top-0
          left-0
          z-50

          ${
            collapsed
              ? "w-24"
              : "w-64"
          }

          bg-[#6f1d46]
          text-white
          min-h-screen

          transition-all
          duration-300

          p-6
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
            className="w-20 mb-4"
          />

          {!collapsed && (
            <>
              <h1
                className="
                  text-3xl
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
                end={item.path === "/"}
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `
                  flex
                  items-center
                  gap-3
                  p-4
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