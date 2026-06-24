import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { DocumentoForm } from "../../../components/documentos/DocumentoForm";
import { useDocumentos } from "../../../context/DocumentosContext";
import { useToast } from "../../../context/ToastContext";

export const AdminNuevoDocumento = () => {
  const navigate = useNavigate();

  const { agregarDocumento } = useDocumentos();
  const { success, error } = useToast();

  const [formulario, setFormulario] = useState({
    titulo: "",
    tipo: "",
    fecha: "",
    descripcion: "",
  });

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      agregarDocumento(formulario);

      success("Documento creado correctamente");

      navigate("/admin/documentos");
    } catch (err) {
      error("Error al crear documento");
    }
  };

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">
        Nuevo Documento
      </h1>

      <DocumentoForm
        formulario={formulario}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonText="Guardar Documento"
      />
    </section>
  );
};