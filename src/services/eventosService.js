import { crearId, mismoId } from "../utils/id";
import {
  obtenerEventosStorage,
  guardarEventosStorage,
} from "../storage/eventosStorage";

export const obtenerEventos = () => obtenerEventosStorage();

export const guardarEventos = (eventos) => guardarEventosStorage(eventos);

export const crearEvento = (nuevoEvento) => ({
  id: crearId(),
  ...nuevoEvento,
});

export const agregarEventoLista = (eventos, nuevoEvento) => [
  crearEvento(nuevoEvento),
  ...eventos,
];

export const editarEventoLista = (eventos, id, datosActualizados) =>
  eventos.map((evento) =>
    mismoId(evento.id, id)
      ? {
          ...evento,
          ...datosActualizados,
        }
      : evento
  );

export const eliminarEventoLista = (eventos, id) =>
  eventos.filter((evento) => !mismoId(evento.id, id));
