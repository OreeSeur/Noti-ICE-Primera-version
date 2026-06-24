import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { usuarios as usuariosIniciales } from "../data/usuarios";

const UsuariosContext = createContext();

export const UsuariosProvider = ({
  children,
}) => {
  const [usuarios, setUsuarios] =
    useState(() => {
      const guardados =
        localStorage.getItem(
          "usuarios"
        );

      return guardados
        ? JSON.parse(guardados)
        : usuariosIniciales;
    });

  useEffect(() => {
    localStorage.setItem(
      "usuarios",
      JSON.stringify(usuarios)
    );
  }, [usuarios]);

  const agregarUsuario = (
    nuevoUsuario
  ) => {
    const usuario = {
      id: Date.now(),
      nombre: "",
      correo: "",
      boleta: "",
      carrera: "",
      semestre: "",
      rol: "usuario",
      estado: "activo",
      password: "",
      ...nuevoUsuario,
    };

    // Compatibilidad temporal
    if (
      usuario.email &&
      !usuario.correo
    ) {
      usuario.correo =
        usuario.email;
    }

    delete usuario.email;

    const existe = usuarios.some(
      (u) =>
        u.correo?.toLowerCase() ===
        usuario.correo?.toLowerCase()
    );

    if (existe) {
      throw new Error(
        "Ya existe un usuario con ese correo"
      );
    }

    setUsuarios((prev) => [
      usuario,
      ...prev,
    ]);
  };

  const eliminarUsuario = (
    id
  ) => {
    setUsuarios((prev) =>
      prev.filter(
        (usuario) =>
          usuario.id !== id
      )
    );
  };

  const editarUsuario = (
    id,
    datosActualizados
  ) => {
    setUsuarios((prev) =>
      prev.map((usuario) =>
        usuario.id === Number(id)
          ? {
              ...usuario,
              ...datosActualizados,
            }
          : usuario
      )
    );
  };

  return (
    <UsuariosContext.Provider
      value={{
        usuarios,
        agregarUsuario,
        eliminarUsuario,
        editarUsuario,
      }}
    >
      {children}
    </UsuariosContext.Provider>
  );
};

export const useUsuarios = () =>
  useContext(UsuariosContext);