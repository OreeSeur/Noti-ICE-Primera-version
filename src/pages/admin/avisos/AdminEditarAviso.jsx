import { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useAvisos } from "../../../context/avisos/useAvisos";
import { useToast } from "../../../context/toast/useToast";
import { AvisoForm } from "../../../components/avisos/AvisoForm";
import { ROUTES } from "../../../constants/routes";
import { mismoId } from "../../../utils/id";
import {
  hasValidationErrors,
  normalizeFormValues,
  validateAviso,
} from "../../../utils/validation";
import { normalizeAudience } from "../../../utils/audience";

export const AdminEditarAviso = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { avisos, editarAviso } = useAvisos();
  const { success, error } = useToast();

  const aviso = avisos.find((item) => mismoId(item.id, id));

  const [formData, setFormData] = useState(
    aviso || {
      titulo: "",
      fecha: "",
      descripcion: "",
      audiencia: normalizeAudience(),
    }
  );
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

    editarAviso(id, datosNormalizados);
    success("Aviso actualizado correctamente");
    navigate(ROUTES.ADMIN_AVISOS);
  };

  if (!aviso) {
    return (
      <section>
        <h2 className="text-red-600 font-bold text-xl">
          Aviso no encontrado
        </h2>
      </section>
    );
  }

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
        Editar Aviso
      </h1>

      <AvisoForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonText="Actualizar Aviso"
        errors={errors}
        handleAudienceChange={handleAudienceChange}
      />
    </section>
  );
};
