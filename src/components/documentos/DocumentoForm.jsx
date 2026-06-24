export const DocumentoForm = ({
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
          Título
        </label>

        <input
          type="text"
          name="titulo"
          value={formulario.titulo}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
          required
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Tipo de documento
        </label>

        <input
          type="text"
          name="tipo"
          value={formulario.tipo}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
          required
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Fecha
        </label>

        <input
          type="date"
          name="fecha"
          value={formulario.fecha}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
          required
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Descripción
        </label>

        <textarea
          name="descripcion"
          value={formulario.descripcion}
          onChange={handleChange}
          rows="5"
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