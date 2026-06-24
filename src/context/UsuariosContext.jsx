import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  obtenerUsuarios,
  guardarUsuarios,
  agregarUsuarioLista,
  editarUsuarioLista,
  eliminarUsuarioLista,
  existeCorreo,
} from "../services/usuariosService";

const UsuariosContext = createContext();

export const UsuariosProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState(() => obtenerUsuarios());

  useEffect(() => {
    guardarUsuarios(usuarios);
  }, [usuarios]);

  const agregarUsuario = (nuevoUsuario) => {
    const correo = nuevoUsuario.correo || nuevoUsuario.email;

    if (existeCorreo(usuarios, correo)) {
      throw new Error("Ya existe un usuario con ese correo");
    }

    setUsuarios((prev) => agregarUsuarioLista(prev, nuevoUsuario));
  };

  const eliminarUsuario = (id) => {
    setUsuarios((prev) => eliminarUsuarioLista(prev, id));
  };

  const editarUsuario = (id, datosActualizados) => {
    if (
      datosActualizados.correo &&
      existeCorreo(usuarios, datosActualizados.correo, id)
    ) {
      throw new Error("Ya existe un usuario con ese correo");
    }

    setUsuarios((prev) => editarUsuarioLista(prev, id, datosActualizados));
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

export const useUsuarios = () => useContext(UsuariosContext);
