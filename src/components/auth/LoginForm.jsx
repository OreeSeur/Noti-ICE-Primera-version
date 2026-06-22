import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

export const LoginForm = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] =
    useState("");

  const [formData, setFormData] =
    useState({
      email: "",
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

    console.clear();

    console.log(
      "========== LOGIN =========="
    );

    console.log(
      "EMAIL:",
      formData.email
    );

    console.log(
      "PASSWORD:",
      formData.password
    );

    setError("");

    const success = login(
      formData.email,
      formData.password
    );

    console.log(
      "RESULTADO LOGIN:",
      success
    );

    if (success) {
      console.log(
        "REDIRECCIONANDO AL HOME..."
      );

      navigate("/");
    } else {
      console.log(
        "LOGIN FALLIDO"
      );

      setError(
        "Correo o contraseña incorrectos"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        bg-white
        dark:bg-slate-800
        p-8
        rounded-2xl
        shadow-lg
        w-full
      "
    >
      <h2
        className="
          text-3xl
          font-bold
          text-center
          text-slate-800
          dark:text-white
          mb-2
        "
      >
        Iniciar Sesión
      </h2>

      <p
        className="
          text-center
          text-slate-500
          dark:text-slate-400
          mb-8
        "
      >
        Accede al Portal Académico ESIME
      </p>

      {error && (
        <div
          className="
            mb-6
            bg-red-100
            text-red-700
            p-3
            rounded-lg
            text-sm
          "
        >
          {error}
        </div>
      )}

      <div className="mb-5">
        <label
          className="
            block
            mb-2
            font-medium
            text-slate-700
            dark:text-slate-300
          "
        >
          Correo Institucional
        </label>

        <div
          className="
            flex
            items-center
            gap-3
            border
            border-slate-300
            dark:border-slate-700
            rounded-lg
            px-4
            py-3
          "
        >
          <Mail size={18} />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="usuario@esime.mx"
            className="
              w-full
              bg-transparent
              outline-none
            "
          />
        </div>
      </div>

      <div className="mb-6">
        <label
          className="
            block
            mb-2
            font-medium
            text-slate-700
            dark:text-slate-300
          "
        >
          Contraseña
        </label>

        <div
          className="
            flex
            items-center
            gap-3
            border
            border-slate-300
            dark:border-slate-700
            rounded-lg
            px-4
            py-3
          "
        >
          <Lock size={18} />

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="123456"
            className="
              w-full
              bg-transparent
              outline-none
            "
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="
          w-full
          bg-[#6A0032]
          text-white
          py-3
          rounded-lg
          font-semibold
          hover:opacity-90
          transition
        "
      >
        Ingresar
      </button>

      <div
        className="
          mt-6
          text-sm
          text-slate-500
          dark:text-slate-400
        "
      >
        <p>Usuario: usuario@esime.mx</p>
        <p>Admin: admin@esime.mx</p>
        <p>Contraseña: 123456</p>
      </div>
    </form>
  );
};