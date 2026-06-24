import { avisos as avisosIniciales } from "../data/avisos";
import { obtenerItem, guardarItem } from "./localStorage";
import { STORAGE_KEYS } from "./storageKeys";

export const obtenerAvisosStorage = () =>
  obtenerItem(STORAGE_KEYS.AVISOS, avisosIniciales);

export const guardarAvisosStorage = (avisos) =>
  guardarItem(STORAGE_KEYS.AVISOS, avisos);
