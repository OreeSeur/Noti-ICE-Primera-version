import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { UsuarioForm } from "../components/forms/UsuarioForm";
import { useUsuarios } from "../context/UsuariosContext";

export const AdminEditarUsuario = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { usuarios, editarUsuario } = useUsuarios();

  const usuario = usuarios.find(
    (u) => u.id === Number(id)
  );

  const [formulario, setFormulario] = useState(
    usuario || {
      nombre: "",
      correo: "",
      rol: "",
      estado: "",
      password: "",
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

    editarUsuario(id, formulario);

    navigate("/admin/usuarios");
  };

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Editar Usuario</h1>

      <UsuarioForm
        formulario={formulario}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonText="Actualizar Usuario"
      />
    </section>
  );
};