import { materias as materiasIniciales } from "../data/materias";
import { grupos as gruposIniciales } from "../data/grupos";
import { asignacionesAcademicas as asignacionesIniciales } from "../data/asignacionesAcademicas";
import { obtenerItem, guardarItem } from "./localStorage";
import { STORAGE_KEYS } from "./storageKeys";

export const obtenerMateriasStorage = () =>
  obtenerItem(STORAGE_KEYS.MATERIAS, materiasIniciales);

export const guardarMateriasStorage = (materias) =>
  guardarItem(STORAGE_KEYS.MATERIAS, materias);

export const obtenerGruposStorage = () =>
  obtenerItem(STORAGE_KEYS.GRUPOS, gruposIniciales);

export const guardarGruposStorage = (grupos) =>
  guardarItem(STORAGE_KEYS.GRUPOS, grupos);

export const obtenerAsignacionesStorage = () =>
  obtenerItem(STORAGE_KEYS.ASIGNACIONES_ACADEMICAS, asignacionesIniciales);

export const guardarAsignacionesStorage = (asignaciones) =>
  guardarItem(STORAGE_KEYS.ASIGNACIONES_ACADEMICAS, asignaciones);
