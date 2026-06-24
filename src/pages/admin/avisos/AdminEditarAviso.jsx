import { useState } from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { useAvisos } from "../../../context/AvisosContext";
import { AvisoForm } from "../../../components/avisos/AvisoForm";
import { ROUTES } from "../../../constants/routes";
import { mismoId } from "../../../utils/id";

export const AdminEditarAviso = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const {
    avisos,
    editarAviso,
  } = useAvisos();

  const aviso = avisos.find(
    (item) => mismoId(item.id, id)
  );

  const [formData, setFormData] =
    useState(
      aviso || {
        titulo: "",
        fecha: "",
        descripcion: "",
      }
    );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    editarAviso(
      id,
      formData
    );

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
      />
    </section>
  );
};
