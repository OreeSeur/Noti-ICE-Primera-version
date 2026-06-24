import { ROLE_OPTIONS } from "../../constants/roles";

export const UsuariosFilters = ({
busqueda,
setBusqueda,
filtroRol,
setFiltroRol,
}) => {
return ( <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-4 mb-6"> <div className="flex flex-col md:flex-row gap-4">
<input
type="text"
placeholder="Buscar usuario..."
value={busqueda}
onChange={(e) =>
setBusqueda(e.target.value)
}
className="
flex-1
border
border-slate-300
dark:border-slate-600
rounded-lg
px-4
py-3
bg-white
dark:bg-slate-700
dark:text-white
outline-none
focus:ring-2
focus:ring-[#6A0032]
"
/>


    <select
      value={filtroRol}
      onChange={(e) =>
        setFiltroRol(e.target.value)
      }
      className="
        border
        border-slate-300
        dark:border-slate-600
        rounded-lg
        px-4
        py-3
        bg-white
        dark:bg-slate-700
        dark:text-white
      "
    >
      <option value="todos">
        Todos
      </option>

      {ROLE_OPTIONS.map((rol) => (
        <option
          key={rol.value}
          value={rol.value}
        >
          {rol.label}
        </option>
      ))}
    </select>
  </div>
</div>

);
};
