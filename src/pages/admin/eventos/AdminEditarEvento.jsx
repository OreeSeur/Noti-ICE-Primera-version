import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useEventos } from "../../../context/EventosContext";
import { EventoForm } from "../../../components/eventos/EventoForm";

export const AdminEditarEvento = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { eventos, editarEvento } = useEventos();

  const evento = eventos.find(
    (evento) => evento.id === Number(id)
  );

  const [formulario, setFormulario] = useState(
    evento || {
      titulo: "",
      fecha: "",
      lugar: "",
      categoria: "",
      descripcion: "",
    }
  );

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    editarEvento(id, formulario);

    navigate("/admin/eventos");
  };

  if (!evento) {
    return (
      <section>
        <h2 className="text-red-600 font-bold text-xl">
          Evento no encontrado
        </h2>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-slate-800">
          Editar Evento
        </h1>
      </header>

      <EventoForm
        formulario={formulario}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonText="Actualizar Evento"
      />
    </section>
  );
};