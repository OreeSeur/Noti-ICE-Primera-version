import { ROLE_OPTIONS } from "../../constants/roles";

export const UsuarioForm = ({
  formulario,
  handleChange,
  handleSubmit,
  buttonText,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-md p-6 space-y-4"
    >
      <div>
        <label className="block mb-2 font-medium">
          Nombre
        </label>

        <input
          type="text"
          name="nombre"
          value={formulario.nombre}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
          required
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Correo
        </label>

        <input
          type="email"
          name="correo"
          value={formulario.correo}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
          required
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Boleta
        </label>

        <input
          type="text"
          name="boleta"
          value={formulario.boleta}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
          required
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Carrera
        </label>

        <input
          type="text"
          name="carrera"
          value={formulario.carrera}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
          required
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Semestre
        </label>

        <input
          type="number"
          min="1"
          max="12"
          name="semestre"
          value={formulario.semestre}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
          required
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Rol
        </label>

        <select
          name="rol"
          value={formulario.rol}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
          required
        >
          <option value="">Selecciona un rol</option>
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

      <div>
        <label className="block mb-2 font-medium">
          Estado
        </label>

        <select
          name="estado"
          value={formulario.estado}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
          required
        >
          <option value="">Selecciona estado</option>
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Contraseña
        </label>

        <input
          type="password"
          name="password"
          value={formulario.password}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
          required
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
};