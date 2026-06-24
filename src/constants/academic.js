export const CARRERAS_ACADEMICAS = Object.freeze([
  "Ingeniería en Computación",
  "Ingeniería en Comunicaciones y Electrónica",
  "Ingeniería Eléctrica",
  "Ingeniería en Control y Automatización",
  "Tronco común",
]);

export const SEMESTRES_ACADEMICOS = Object.freeze([
  "1° Semestre",
  "2° Semestre",
  "3° Semestre",
  "4° Semestre",
  "5° Semestre",
  "6° Semestre",
  "7° Semestre",
  "8° Semestre",
  "9° Semestre",
  "10° Semestre",
]);

export const TURNOS_ACADEMICOS = Object.freeze([
  "Matutino",
  "Vespertino",
  "Mixto",
]);

export const PERIODOS_ACADEMICOS = Object.freeze([
  "2026-1",
  "2026-2",
  "2027-1",
]);

export const AREAS_MATERIA = Object.freeze([
  "Programación",
  "Matemáticas",
  "Electrónica",
  "Redes",
  "Gestión académica",
  "Investigación",
  "Formación institucional",
]);

export const getSemestreNumero = (semestre = "") => {
  const match = String(semestre).match(/\d+/);
  return match ? Number(match[0]) : null;
};
