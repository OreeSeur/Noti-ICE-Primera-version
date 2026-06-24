import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import { useUsuarios } from "./UsuariosContext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { agregarUsuario, usuarios } = useUsuarios();

  const [user, setUser] = useState(() => {
    const guardado = localStorage.getItem("user");
    return guardado ? JSON.parse(guardado) : null;
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const login = (correo, password) => {
    const usuario = usuarios.find(
      (u) => u.correo === correo && u.password === password
    );

    if (!usuario) return false;

    setUser(usuario);
    return true;
  };

const register = (nuevoUsuario) => {
  const existe = usuarios.find(
    (u) => u.correo === nuevoUsuario.correo
  );

  if (existe) return false;

  const usuarioCreado = {
    id: Date.now(),
    nombre: "",
    correo: "",
    rol: "usuario",
    estado: "activo",
    password: "",
    ...nuevoUsuario,
  };

  agregarUsuario(usuarioCreado);

  // 🔥 AUTO LOGIN DESPUÉS DE REGISTRO
  setUser(usuarioCreado);

  return true;
};
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);