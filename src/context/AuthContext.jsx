import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { useUsuarios } from "./UsuariosContext";
import {
  autenticarUsuario,
  crearUsuarioRegistro,
  obtenerSesion,
  guardarSesion,
  cerrarSesion,
} from "../services/authService";
import { existeCorreo } from "../services/usuariosService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { agregarUsuario, usuarios } = useUsuarios();

  const [user, setUser] = useState(() => obtenerSesion());

  useEffect(() => {
    guardarSesion(user);
  }, [user]);

  const login = (correo, password) => {
    const usuario = autenticarUsuario(usuarios, correo, password);

    if (!usuario) return false;

    setUser(usuario);
    return true;
  };

  const register = (nuevoUsuario) => {
    if (existeCorreo(usuarios, nuevoUsuario.correo)) {
      return false;
    }

    const usuarioCreado = crearUsuarioRegistro(nuevoUsuario);

    agregarUsuario(usuarioCreado);
    setUser(usuarioCreado);

    return true;
  };

  const logout = () => {
    setUser(null);
    cerrarSesion();
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
