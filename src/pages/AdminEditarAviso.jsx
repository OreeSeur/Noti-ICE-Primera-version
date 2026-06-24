import {
  useState,
  useEffect,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { useAvisos } from "../context/AvisosContext";
import { AvisoForm } from "../components/avisos/AvisoForm";

export const AdminEditarAviso = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const {
    avisos,
    editarAviso,
  } = useAvisos();

  const [formData, setFormData] =
    useState({
      titulo: "",
      fecha: "",
      descripcion: "",
    });

  useEffect(() => {
    const aviso =
      avisos.find(
        (item) =>
          item.id === Number(id)
      );

    if (aviso) {
      setFormData({
        titulo: aviso.titulo,
        fecha: aviso.fecha,
        descripcion:
          aviso.descripcion,
      });
    }
  }, [id, avisos]);

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