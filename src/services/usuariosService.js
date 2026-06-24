import { crearId, mismoId } from "../utils/id";
import { ROLES } from "../constants/roles";
import {
  obtenerUsuariosStorage,
  guardarUsuariosStorage,
} from "../storage/usuariosStorage";

export const obtenerUsuarios = () => obtenerUsuariosStorage();

export const guardarUsuarios = (usuarios) =>
  guardarUsuariosStorage(usuarios);

export const crearUsuario = (nuevoUsuario) => {
  const usuario = {
    id: crearId(),
    nombre: "",
    correo: "",
    boleta: "",
    carrera: "",
    semestre: "",
    rol: ROLES.ALUMNO,
    estado: "activo",
    password: "",
    ...nuevoUsuario,
  };

  if (usuario.email && !usuario.correo) {
    usuario.correo = usuario.email;
  }

  delete usuario.email;

  return usuario;
};

export const existeCorreo = (usuarios, correo, idIgnorado = null) =>
  usuarios.some(
    (usuario) =>
      usuario.correo?.toLowerCase() === correo?.toLowerCase() &&
      (idIgnorado === null || !mismoId(usuario.id, idIgnorado))
  );

export const agregarUsuarioLista = (usuarios, nuevoUsuario) => [
  crearUsuario(nuevoUsuario),
  ...usuarios,
];

export const editarUsuarioLista = (usuarios, id, datosActualizados) =>
  usuarios.map((usuario) =>
    mismoId(usuario.id, id)
      ? {
          ...usuario,
          ...datosActualizados,
        }
      : usuario
  );

export const eliminarUsuarioLista = (usuarios, id) =>
  usuarios.filter((usuario) => !mismoId(usuario.id, id));
