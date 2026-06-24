import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { UsuarioForm } from "../../../components/usuarios/UsuarioForm";
import { useUsuarios } from "../../../context/usuarios/useUsuarios";
import { ROUTES } from "../../../constants/routes";
import { ROLES } from "../../../constants/roles";
import { mismoId } from "../../../utils/id";

export const AdminEditarUsuario = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { usuarios, editarUsuario } = useUsuarios();

  const usuario = usuarios.find(
    (u) => mismoId(u.id, id)
  );

  const [formulario, setFormulario] = useState(
    usuario || {
      nombre: "",
      correo: "",
      boleta: "",
      carrera: "",
      semestre: "",
      rol: ROLES.ALUMNO,
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

    navigate(ROUTES.ADMIN_USUARIOS);
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