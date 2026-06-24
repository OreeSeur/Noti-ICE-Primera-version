import { FormError } from "../common/FormError";

export const DocumentoForm = ({
  formulario,
  handleChange,
  handleSubmit,
  buttonText,
  errors = {},
}) => {
  const inputClass = (field) =>
    `w-full border rounded-lg px-4 py-2 bg-transparent ${
      errors[field] ? "border-red-500" : "border-slate-300 dark:border-slate-700"
    }`;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 space-y-4"
    >
      <div>
        <label className="block mb-2 font-medium">Título</label>
        <input
          type="text"
          name="titulo"
          value={formulario.titulo ?? ""}
          onChange={handleChange}
          className={inputClass("titulo")}
        />
        <FormError message={errors.titulo} />
      </div>

      <div>
        <label className="block mb-2 font-medium">Tipo de documento</label>
        <input
          type="text"
          name="tipo"
          value={formulario.tipo ?? ""}
          onChange={handleChange}
          className={inputClass("tipo")}
        />
        <FormError message={errors.tipo} />
      </div>

      <div>
        <label className="block mb-2 font-medium">Fecha</label>
        <input
          type="date"
          name="fecha"
          value={formulario.fecha ?? ""}
          onChange={handleChange}
          className={inputClass("fecha")}
        />
        <FormError message={errors.fecha} />
      </div>

      <div>
        <label className="block mb-2 font-medium">Descripción</label>
        <textarea
          name="descripcion"
          value={formulario.descripcion ?? ""}
          onChange={handleChange}
          rows="5"
          className={inputClass("descripcion")}
        />
        <FormError message={errors.descripcion} />
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
