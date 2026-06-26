import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAvisos } from "../../../context/avisos/useAvisos";
import { useToast } from "../../../context/toast/useToast";
import { AvisoForm } from "../../../components/avisos/AvisoForm";
import { ROUTES } from "../../../constants/routes";
import {
  hasValidationErrors,
  normalizeFormValues,
  validateAviso,
} from "../../../utils/validation";
import { normalizeAudience } from "../../../utils/audience";

export const AdminNuevoAviso = () => {
  const navigate = useNavigate();

  const { agregarAviso } = useAvisos();
  const { success, error } = useToast();

  const [formData, setFormData] = useState({
    titulo: "",
    fecha: "",
    descripcion: "",
    audiencia: normalizeAudience(),
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const handleAudienceChange = (field, value) => {
    setFormData((prev) => {
      const audienciaActual = normalizeAudience(prev.audiencia);

      return {
        ...prev,
        audiencia: {
          ...audienciaActual,
          [field]: value,
        },
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const datosNormalizados = normalizeFormValues(formData);
    const validationErrors = validateAviso(datosNormalizados);

    if (hasValidationErrors(validationErrors)) {
      setErrors(validationErrors);
      error("Revisa los campos marcados");
      return;
    }

    agregarAviso(datosNormalizados);
    success("Aviso creado correctamente");
    navigate(ROUTES.ADMIN_AVISOS);
  };

  return (
    <section>
      <h1
        className="
          text-3xl
          font-bold
          mb-8
          text-slate-800
          dark:text-white
        "
      >
        Nuevo Aviso
      </h1>

      <AvisoForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonText="Guardar Aviso"
        errors={errors}
        handleAudienceChange={handleAudienceChange}
      />
    </section>
  );
};
