import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { DocumentoForm } from "../components/documentos/DocumentoForm";

export const AdminEditarDocumento = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const documentoMock = {
    id,
    titulo: "Ejemplo",
    tipo: "PDF",
    fecha: "",
    descripcion: "",
  };

  const [formulario, setFormulario] = useState(documentoMock);

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formulario); // luego contexto

    navigate("/admin/documentos");
  };

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">
        Editar Documento
      </h1>

      <DocumentoForm
        formulario={formulario}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonText="Actualizar Documento"
      />
    </section>
  );
};