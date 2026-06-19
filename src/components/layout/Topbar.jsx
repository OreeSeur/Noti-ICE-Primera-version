import {
  Bell,
  Search,
  User,
  Menu
} from "lucide-react";

export const Topbar = ({
  setMobileOpen
}) => {
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
        mb-8
      "
    >
      <div className="flex items-center gap-4">

        {/* Botón móvil */}
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden"
        >
          <Menu size={24} />
        </button>

        {/* Buscador */}
        <div
          className="
            hidden
            lg:flex
            items-center
            gap-2
            bg-slate-100
            px-4
            py-2
            rounded-lg
            w-80
          "
        >
          <Search size={18} />

          <input
            type="text"
            placeholder="Buscar..."
            className="
              bg-transparent
              outline-none
              w-full
            "
          />
        </div>

      </div>

      <div className="flex items-center gap-6">
        <Bell
          size={22}
          className="cursor-pointer"
        />

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