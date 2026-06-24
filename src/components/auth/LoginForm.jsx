import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

export const LoginForm = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (mode === "login") {
      const success = login(
        formData.correo,
        formData.password
      );

      if (success) return navigate("/");

      return setError("Credenciales incorrectas");
    }

    const success = register({
      nombre: formData.nombre,
      correo: formData.correo,
      password: formData.password,
      rol: "usuario",
      estado: "activo",
    });

    if (!success) {
      return setError("El usuario ya existe");
    }

    navigate("/");
  };

  return (
    <form className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg w-full" onSubmit={handleSubmit}>
      <h2 className="text-3xl font-bold text-center mb-4">
        {mode === "login" ? "Iniciar Sesión" : "Registro"}
      </h2>

      {error && (
        <div className="mb-4 text-red-600 bg-red-100 p-2 rounded">
          {error}
        </div>
      )}

      {mode === "register" && (
        <div className="mb-4">
          <label>Nombre</label>
          <div className="flex items-center gap-2 border p-2 rounded">
            <User size={18} />
            <input
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full outline-none"
            />
          </div>
        </div>
      )}

      <div className="mb-4">
        <label>Correo</label>
        <div className="flex items-center gap-2 border p-2 rounded">
          <Mail size={18} />
          <input
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            className="w-full outline-none"
          />
        </div>
      </div>

      <div className="mb-4">
        <label>Contraseña</label>
        <div className="flex items-center gap-2 border p-2 rounded">
          <Lock size={18} />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full outline-none"
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>
      </div>

      <button className="w-full bg-[#6A0032] text-white py-2 rounded">
        {mode === "login" ? "Ingresar" : "Registrarse"}
      </button>

      <p
        className="text-center mt-4 text-sm cursor-pointer"
        onClick={() =>
          setMode(mode === "login" ? "register" : "login")
        }
      >
        {mode === "login"
          ? "¿No tienes cuenta? Regístrate"
          : "¿Ya tienes cuenta? Inicia sesión"}
      </p>
    </form>
  );
};