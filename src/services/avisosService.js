import { crearId, mismoId } from "../utils/id";
import { normalizeAudience } from "../utils/audience";
import {
  obtenerAvisosStorage,
  guardarAvisosStorage,
} from "../storage/avisosStorage";

export const obtenerAvisos = () => obtenerAvisosStorage();


const normalizeContent = (content) => ({
  ...content,
  audiencia: normalizeAudience(content.audiencia),
});

export const guardarAvisos = (avisos) => guardarAvisosStorage(avisos);

export const crearAviso = (nuevoAviso) => ({
  ...normalizeContent(nuevoAviso),
  id: crearId(),
  createdAt: new Date().toISOString(),
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
          ...normalizeContent(datosActualizados),
          updatedAt: new Date().toISOString(),
        }
      : aviso
  );

export const eliminarAvisoLista = (avisos, id) =>
  avisos.filter((aviso) => !mismoId(aviso.id, id));
