import { useCallback, useEffect, useMemo, useState } from "react";

import { useUsuarios } from "../usuarios/useUsuarios";
import {
  autenticarUsuario,
  crearUsuarioRegistro,
  obtenerSesion,
  guardarSesion,
  cerrarSesion,
} from "../../services/authService";
import { existeCorreo } from "../../services/usuariosService";
import { hasRole, canAccessAdmin } from "../../utils/permissions";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const { agregarUsuario, usuarios } = useUsuarios();

  const [user, setUser] = useState(() => obtenerSesion());

  useEffect(() => {
    guardarSesion(user);
  }, [user]);

  const login = useCallback(
    (correo, password) => {
      const usuario = autenticarUsuario(usuarios, correo, password);

      if (!usuario) return false;

      setUser(usuario);
      return true;
    },
    [usuarios]
  );

  const register = useCallback(
    (nuevoUsuario) => {
      if (existeCorreo(usuarios, nuevoUsuario.correo)) {
        return false;
      }

      const usuarioCreado = crearUsuarioRegistro(nuevoUsuario);

      agregarUsuario(usuarioCreado);
      setUser(usuarioCreado);

      return true;
    },
    [agregarUsuario, usuarios]
  );

  const logout = useCallback(() => {
    setUser(null);
    cerrarSesion();
  }, []);

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      register,
      hasRole: (rolesPermitidos) => hasRole(user, rolesPermitidos),
      canAccessAdmin: () => canAccessAdmin(user),
    }),
    [user, login, logout, register]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
