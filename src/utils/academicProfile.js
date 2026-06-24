import { PERIODOS_ACADEMICOS } from "../constants/academic";

export const DEFAULT_ACADEMIC_PROFILE = Object.freeze({
  plan: "2024",
  periodo: PERIODOS_ACADEMICOS[0],
  grupoId: "",
  materiasIds: [],
});

export const normalizeAcademicProfile = (profile = {}) => ({
  ...DEFAULT_ACADEMIC_PROFILE,
  ...profile,
  materiasIds: Array.isArray(profile?.materiasIds)
    ? profile.materiasIds.map(String)
    : [],
});

export const getMateriaById = (materias = [], materiaId) =>
  materias.find((materia) => String(materia.id) === String(materiaId));

export const getGrupoById = (grupos = [], grupoId) =>
  grupos.find((grupo) => String(grupo.id) === String(grupoId));

export const getUsuarioById = (usuarios = [], usuarioId) =>
  usuarios.find((usuario) => String(usuario.id) === String(usuarioId));

export const getMateriasPorPlanYSemestre = ({ materias = [], plan, semestreNumero }) =>
  materias
    .filter((materia) => String(materia.plan) === String(plan))
    .filter((materia) =>
      semestreNumero ? Number(materia.semestreNumero) === Number(semestreNumero) : true
    )
    .sort((a, b) => String(a.nombre || "").localeCompare(String(b.nombre || ""), "es"));

export const getGruposOrdenados = (grupos = []) =>
  [...grupos].sort((a, b) => {
    const semestre = (a.semestreNumero || 99) - (b.semestreNumero || 99);
    if (semestre !== 0) return semestre;

    const turno = String(a.turnoCodigo || "").localeCompare(String(b.turnoCodigo || ""));
    if (turno !== 0) return turno;

    return (a.numeroGrupo || 99) - (b.numeroGrupo || 99);
  });

export const getAsignacionesPorDocente = ({ asignaciones = [], docenteId }) =>
  asignaciones.filter((asignacion) => String(asignacion.profesorId) === String(docenteId));

export const getAsignacionesPorMateriaGrupo = ({
  asignaciones = [],
  materiaId,
  grupoId,
  plan,
  periodo = "",
}) =>
  asignaciones.filter((asignacion) => {
    const matchesMateria = String(asignacion.materiaId) === String(materiaId);
    const matchesGrupo = String(asignacion.grupoId) === String(grupoId);
    const matchesPlan = !plan || String(asignacion.plan) === String(plan);
    const matchesPeriodo = !periodo || asignacion.periodo === periodo;

    return matchesMateria && matchesGrupo && matchesPlan && matchesPeriodo;
  });

export const existeAsignacionDocente = ({
  asignaciones = [],
  profesorId,
  materiaId,
  grupoId,
  plan,
  periodo,
}) =>
  asignaciones.some(
    (asignacion) =>
      String(asignacion.profesorId) === String(profesorId) &&
      String(asignacion.materiaId) === String(materiaId) &&
      String(asignacion.grupoId) === String(grupoId) &&
      String(asignacion.plan) === String(plan) &&
      asignacion.periodo === periodo
  );

export const buildAsignacionDetalle = ({ asignacion, materias = [], grupos = [], usuarios = [] }) => {
  const materia = getMateriaById(materias, asignacion.materiaId);
  const grupo = getGrupoById(grupos, asignacion.grupoId);
  const profesor = getUsuarioById(usuarios, asignacion.profesorId);

  return {
    ...asignacion,
    materia,
    grupo,
    profesor,
    materiaNombre: materia?.nombre || "Materia no encontrada",
    grupoNombre: grupo?.nombre || "Grupo no encontrado",
    profesorNombre: profesor?.nombre || "Docente no encontrado",
    profesorCorreo: profesor?.correo || "",
    semestre: grupo?.semestre || materia?.semestre || "Sin semestre",
    turno: grupo?.turno || "Sin turno",
  };
};
