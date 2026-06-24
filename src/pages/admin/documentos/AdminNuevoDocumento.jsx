import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { DocumentoForm } from "../../../components/documentos/DocumentoForm";
import { useDocumentos } from "../../../context/documentos/useDocumentos";
import { useToast } from "../../../context/toast/useToast";
import { ROUTES } from "../../../constants/routes";
import {
  hasValidationErrors,
  normalizeFormValues,
  validateDocumento,
} from "../../../utils/validation";

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
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });

    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const datosNormalizados = normalizeFormValues(formulario);
    const validationErrors = validateDocumento(datosNormalizados);

    if (hasValidationErrors(validationErrors)) {
      setErrors(validationErrors);
      error("Revisa los campos marcados");
      return;
    }

    try {
      agregarDocumento(datosNormalizados);
      success("Documento creado correctamente");
      navigate(ROUTES.ADMIN_DOCUMENTOS);
    } catch {
      error("Error al crear documento");
    }
  };

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Nuevo Documento</h1>

      <DocumentoForm
        formulario={formulario}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonText="Guardar Documento"
        errors={errors}
      />
    </section>
  );
};
