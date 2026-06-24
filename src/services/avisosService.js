import { crearId, mismoId } from "../utils/id";
import {
  obtenerAvisosStorage,
  guardarAvisosStorage,
} from "../storage/avisosStorage";

export const obtenerAvisos = () => obtenerAvisosStorage();

export const guardarAvisos = (avisos) => guardarAvisosStorage(avisos);

export const crearAviso = (nuevoAviso) => ({
  id: crearId(),
  createdAt: new Date().toISOString(),
  ...nuevoAviso,
});

export const agregarAvisoLista = (avisos, nuevoAviso) => [
  crearAviso(nuevoAviso),
  ...avisos,
];

export const editarAvisoLista = (avisos, id, datosActualizados) =>
  avisos.map((aviso) =>
    mismoId(aviso.id, id)
      ? {
          ...aviso,
          ...datosActualizados,
        }
      : aviso
  );

export const eliminarAvisoLista = (avisos, id) =>
  avisos.filter((aviso) => !mismoId(aviso.id, id));
