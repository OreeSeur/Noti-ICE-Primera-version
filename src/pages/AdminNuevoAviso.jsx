import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAvisos } from "../context/AvisosContext";
import { AvisoForm } from "../components/avisos/AvisoForm";

export const AdminNuevoAviso = () => {
  const navigate = useNavigate();

  const { agregarAviso } = useAvisos();

  const [formData, setFormData] = useState({
    titulo: "",
    fecha: "",
    descripcion: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    agregarAviso(formData);

    navigate("/admin/avisos");
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
      />
    </section>
  );
};