import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { UsuarioForm } from "../components/forms/UsuarioForm";
import { useUsuarios } from "../context/UsuariosContext";
import { useToast } from "../context/ToastContext";

export const AdminNuevoUsuario = () => {
const navigate = useNavigate();

const { agregarUsuario } = useUsuarios();
const { success, error } = useToast();

const [formulario, setFormulario] = useState({
nombre: "",
correo: "",
boleta: "",
carrera: "",
semestre: "",
rol: "usuario",
estado: "activo",
password: "",
});

const handleChange = (e) => {
setFormulario({
...formulario,
[e.target.name]: e.target.value,
});
};

const handleSubmit = (e) => {
e.preventDefault();

```
try {
  agregarUsuario(formulario);

  success(
    "Usuario creado correctamente"
  );

  navigate("/admin/usuarios");
} catch (err) {
  error(
    err.message ||
      "Error al crear usuario"
  );
}
```

};

return ( <section className="space-y-6"> <h1 className="text-3xl font-bold">
Nuevo Usuario </h1>

```
  <UsuarioForm
    formulario={formulario}
    handleChange={handleChange}
    handleSubmit={handleSubmit}
    buttonText="Guardar Usuario"
  />
</section>

);
};
