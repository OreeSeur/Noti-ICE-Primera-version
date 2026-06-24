import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useEventos } from "../../../context/eventos/useEventos";
import { EventoForm } from "../../../components/eventos/EventoForm";
import { ROUTES } from "../../../constants/routes";

export const AdminNuevoEvento = () => {
  const navigate = useNavigate();
  const { agregarEvento } = useEventos();

  const [formulario, setFormulario] = useState({
    titulo: "",
    fecha: "",
    lugar: "",
    categoria: "",
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

    agregarEvento(formulario);

    navigate(ROUTES.ADMIN_EVENTOS);
  };

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-slate-800">
          Nuevo Evento
        </h1>
      </header>

      <EventoForm
        formulario={formulario}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonText="Guardar Evento"
      />
    </section>
  );
};