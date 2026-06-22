import {
  useState,
  useEffect,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { useDocumentos } from "../context/DocumentosContext";

export const AdminEditarDocumento = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const {
    documentos,
    editarDocumento,
  } = useDocumentos();

  const [formulario, setFormulario] =
    useState({
      nombre: "",
      tipo: "PDF",
      fecha: "",
      descripcion: "",
    });

  useEffect(() => {
    const documento =
      documentos.find(
        (item) =>
          item.id === Number(id)
      );

    if (documento) {
      setFormulario({
        nombre:
          documento.nombre,
        tipo:
          documento.tipo,
        fecha:
          documento.fecha,
        descripcion:
          documento.descripcion,
      });
    }
  }, [
    id,
    documentos,
  ]);

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    editarDocumento(
      id,
      formulario
    );

    navigate(
      "/admin/documentos"
    );
  };

  return (
    <section className="space-y-6">
      <header>
        <h1
          className="
            text-3xl
            font-bold
            text-slate-800
            dark:text-white
          "
        >
          Editar Documento
        </h1>

        <p
          className="
            text-slate-500
            dark:text-slate-400
          "
        >
          Modifica la información del documento.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="
          bg-white
          dark:bg-slate-800
          rounded-xl
          shadow-md
          p-6
          space-y-4
        "
      >
        <div>
          <label
            className="
              block
              mb-2
              font-medium
            "
          >
            Nombre
          </label>

          <input
            type="text"
            name="nombre"
            value={
              formulario.nombre
            }
            onChange={
              handleChange
            }
            required
            className="
              w-full
              border
              rounded-lg
              px-4
              py-2
            "
          />
        </div>

        <div>
          <label
            className="
              block
              mb-2
              font-medium
            "
          >
            Tipo
          </label>

          <select
            name="tipo"
            value={
              formulario.tipo
            }
            onChange={
              handleChange
            }
            className="
              w-full
              border
              rounded-lg
              px-4
              py-2
            "
          >
            <option>
              PDF
            </option>

            <option>
              DOCX
            </option>

            <option>
              XLSX
            </option>

            <option>
              PPTX
            </option>
          </select>
        </div>

        <div>
          <label
            className="
              block
              mb-2
              font-medium
            "
          >
            Fecha
          </label>

          <input
            type="date"
            name="fecha"
            value={
              formulario.fecha
            }
            onChange={
              handleChange
            }
            required
            className="
              w-full
              border
              rounded-lg
              px-4
              py-2
            "
          />
        </div>

        <div>
          <label
            className="
              block
              mb-2
              font-medium
            "
          >
            Descripción
          </label>

          <textarea
            rows="5"
            name="descripcion"
            value={
              formulario.descripcion
            }
            onChange={
              handleChange
            }
            required
            className="
              w-full
              border
              rounded-lg
              px-4
              py-2
            "
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="
              bg-[#6A0032]
              text-white
              px-6
              py-2
              rounded-lg
              hover:opacity-90
            "
          >
            Actualizar
          </button>

          <button
            type="button"
            onClick={() =>
              navigate(
                "/admin/documentos"
              )
            }
            className="
              bg-slate-200
              px-6
              py-2
              rounded-lg
            "
          >
            Cancelar
          </button>
        </div>
      </form>
    </section>
  );
};