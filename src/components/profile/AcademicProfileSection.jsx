import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ClipboardList,
  GraduationCap,
  Layers3,
  School,
  UserCheck,
} from "lucide-react";

import { getPlanLabel, PERIODOS_ACADEMICOS, PLANES_ESTUDIO } from "../../constants/academic";
import { ROUTES } from "../../constants/routes";
import { ROLES, normalizeRole } from "../../constants/roles";
import { useAcademico } from "../../context/academico/useAcademico";
import { useToast } from "../../context/toast/useToast";
import { useUsuarios } from "../../context/usuarios/useUsuarios";
import { FormError } from "../common/FormError";
import { StatusBadge } from "../common/StatusBadge";
import {
  buildAsignacionDetalle,
  existeAsignacionDocente,
  getAsignacionesPorDocente,
  getAsignacionesPorMateriaGrupo,
  getGrupoById,
  getGruposOrdenados,
  getMateriaById,
  getMateriasPorPlanYSemestre,
  normalizeAcademicProfile,
} from "../../utils/academicProfile";

const cardClass =
  "rounded-2xl border border-slate-200 bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-800";

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:ring-2 focus:ring-[#6A0032] dark:border-slate-600 dark:bg-slate-700 dark:text-white";

const labelClass = "text-sm font-semibold text-slate-700 dark:text-slate-200";

const Field = ({ label, error, children }) => (
  <label className="space-y-2">
    <span className={labelClass}>{label}</span>
    {children}
    <FormError message={error} />
  </label>
);

const EmptyAcademicState = ({ title, message }) => (
  <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-500 dark:border-slate-600 dark:bg-slate-900/40 dark:text-slate-400">
    <p className="font-semibold text-slate-700 dark:text-slate-200">{title}</p>
    <p className="mt-1 leading-relaxed">{message}</p>
  </div>
);

const AsignacionCard = ({ asignacion }) => (
  <article className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/40">
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6A0032] dark:text-pink-200">
          {getPlanLabel(asignacion.plan)} · {asignacion.periodo}
        </p>
        <h3 className="mt-1 font-bold text-slate-800 dark:text-white">
          {asignacion.materiaNombre}
        </h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {asignacion.grupoNombre} · {asignacion.semestre} · {asignacion.turno}
        </p>
      </div>
      <StatusBadge label={asignacion.grupoNombre} variant="success" />
    </div>
  </article>
);

const ProfesorAsignado = ({ asignaciones }) => {
  if (asignaciones.length === 0) {
    return (
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Aún no hay docente asignado para esta materia y grupo en el periodo seleccionado.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {asignaciones.map((asignacion) => (
        <div
          key={asignacion.id}
          className="rounded-lg bg-white p-3 text-sm shadow-sm dark:bg-slate-800"
        >
          <p className="font-semibold text-slate-800 dark:text-white">
            {asignacion.profesorNombre}
          </p>
          <p className="text-slate-500 dark:text-slate-400">{asignacion.profesorCorreo}</p>
        </div>
      ))}
    </div>
  );
};

const AlumnoAcademicProfile = ({ user, onSave }) => {
  const { materias, grupos, asignaciones } = useAcademico();
  const { usuarios } = useUsuarios();
  const { success, error } = useToast();

  const [profile, setProfile] = useState(() => normalizeAcademicProfile(user.academicProfile));
  const [errors, setErrors] = useState({});

  const gruposOrdenados = useMemo(() => getGruposOrdenados(grupos), [grupos]);

  const grupoSeleccionado = useMemo(
    () => getGrupoById(grupos, profile.grupoId),
    [grupos, profile.grupoId]
  );

  const materiasDisponibles = useMemo(
    () =>
      getMateriasPorPlanYSemestre({
        materias,
        plan: profile.plan,
        semestreNumero: grupoSeleccionado?.semestreNumero,
      }),
    [grupoSeleccionado, materias, profile.plan]
  );

  const materiasSeleccionadas = useMemo(
    () =>
      profile.materiasIds
        .map((materiaId) => getMateriaById(materias, materiaId))
        .filter(Boolean),
    [materias, profile.materiasIds]
  );

  const profesoresPorMateria = useMemo(
    () =>
      materiasSeleccionadas.map((materia) => ({
        materia,
        asignaciones: getAsignacionesPorMateriaGrupo({
          asignaciones,
          materiaId: materia.id,
          grupoId: profile.grupoId,
          plan: profile.plan,
          periodo: profile.periodo,
        }).map((asignacion) =>
          buildAsignacionDetalle({ asignacion, materias, grupos, usuarios })
        ),
      })),
    [asignaciones, grupos, materias, materiasSeleccionadas, profile, usuarios]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProfile((prev) => {
      const next = { ...prev, [name]: value };

      if (name === "plan") {
        next.materiasIds = [];
      }

      if (name === "grupoId") {
        next.materiasIds = [];
      }

      return next;
    });

    if (errors[name] || errors.materiasIds) {
      setErrors((prev) => ({ ...prev, [name]: "", materiasIds: "" }));
    }
  };

  const handleToggleMateria = (materiaId) => {
    setProfile((prev) => {
      const materiaIdString = String(materiaId);
      const materiasIds = prev.materiasIds.includes(materiaIdString)
        ? prev.materiasIds.filter((id) => id !== materiaIdString)
        : [...prev.materiasIds, materiaIdString];

      return {
        ...prev,
        materiasIds,
      };
    });

    if (errors.materiasIds) setErrors((prev) => ({ ...prev, materiasIds: "" }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = {
      plan: profile.plan ? "" : "Selecciona un plan de estudios",
      grupoId: profile.grupoId ? "" : "Selecciona tu grupo",
      materiasIds:
        profile.materiasIds.length > 0 ? "" : "Selecciona al menos una materia inscrita",
    };

    if (Object.values(validationErrors).some(Boolean)) {
      setErrors(validationErrors);
      error("Revisa tu perfil académico");
      return;
    }

    const usuarioActualizado = {
      academicProfile: profile,
      carrera: grupoSeleccionado?.carrera || user.carrera,
      semestre: grupoSeleccionado?.semestre || user.semestre,
    };

    onSave(usuarioActualizado);
    success("Perfil académico actualizado correctamente");
  };

  return (
    <form onSubmit={handleSubmit} className={`${cardClass} space-y-6`}>
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#6A0032] dark:text-pink-200">
          Alumno
        </p>
        <h2 className="mt-1 text-xl font-bold text-slate-800 dark:text-white">
          Perfil académico
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Selecciona tu plan, grupo y materias. El profesor se obtiene automáticamente desde las asignaciones docentes.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Field label="Plan de estudios" error={errors.plan}>
          <select name="plan" value={profile.plan} onChange={handleChange} className={inputClass}>
            {PLANES_ESTUDIO.map((plan) => (
              <option key={plan} value={plan}>
                {getPlanLabel(plan)}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Grupo" error={errors.grupoId}>
          <select
            name="grupoId"
            value={profile.grupoId}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Selecciona tu grupo</option>
            {gruposOrdenados.map((grupo) => (
              <option key={grupo.id} value={grupo.id}>
                {grupo.nombre} · {grupo.semestre} · {grupo.turno}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Periodo">
          <select
            name="periodo"
            value={profile.periodo}
            onChange={handleChange}
            className={inputClass}
          >
            {PERIODOS_ACADEMICOS.map((periodo) => (
              <option key={periodo} value={periodo}>
                {periodo}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {grupoSeleccionado && (
        <div className="grid gap-3 rounded-xl bg-slate-50 p-4 text-sm dark:bg-slate-900/40 sm:grid-cols-3">
          <p>
            <strong>Semestre:</strong> {grupoSeleccionado.semestre}
          </p>
          <p>
            <strong>Turno:</strong> {grupoSeleccionado.turno}
          </p>
          <p>
            <strong>Materias disponibles:</strong> {materiasDisponibles.length}
          </p>
        </div>
      )}

      <div className="space-y-3">
        <div>
          <h3 className="font-bold text-slate-800 dark:text-white">Materias inscritas</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Sólo se muestran materias del plan seleccionado y del semestre de tu grupo.
          </p>
          <FormError message={errors.materiasIds} />
        </div>

        {!grupoSeleccionado ? (
          <EmptyAcademicState
            title="Primero selecciona un grupo"
            message="Después de elegir tu grupo aparecerán las materias correspondientes al semestre."
          />
        ) : materiasDisponibles.length === 0 ? (
          <EmptyAcademicState
            title="No hay materias disponibles"
            message="Cambia de plan o revisa que existan materias cargadas para el semestre de tu grupo."
          />
        ) : (
          <div className="grid max-h-96 gap-3 overflow-y-auto pr-1 md:grid-cols-2">
            {materiasDisponibles.map((materia) => (
              <label
                key={materia.id}
                className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-[#6A0032]/60 hover:bg-[#6A0032]/5 dark:border-slate-700 dark:hover:bg-slate-700/60"
              >
                <input
                  type="checkbox"
                  checked={profile.materiasIds.includes(String(materia.id))}
                  onChange={() => handleToggleMateria(materia.id)}
                  className="mt-1 h-4 w-4 accent-[#6A0032]"
                />
                <span>
                  <span className="block font-semibold text-slate-800 dark:text-white">
                    {materia.nombre}
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {materia.tipo || "Obligatoria"}
                    {materia.opcion ? ` · ${materia.opcion}` : ""}
                  </span>
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 dark:border-blue-900/40 dark:bg-blue-900/20">
        <div className="mb-3 flex items-center gap-2 font-bold text-blue-950 dark:text-blue-100">
          <UserCheck size={18} /> Profesores detectados
        </div>
        {materiasSeleccionadas.length === 0 ? (
          <p className="text-sm text-blue-900/80 dark:text-blue-100/80">
            Selecciona materias para consultar qué docentes las imparten en tu grupo.
          </p>
        ) : (
          <div className="space-y-4">
            {profesoresPorMateria.map(({ materia, asignaciones }) => (
              <div key={materia.id} className="rounded-xl bg-blue-100/60 p-3 dark:bg-blue-950/30">
                <p className="mb-2 font-semibold text-blue-950 dark:text-blue-100">
                  {materia.nombre}
                </p>
                <ProfesorAsignado asignaciones={asignaciones} />
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#6A0032] px-5 py-3 font-semibold text-white transition hover:opacity-90 sm:w-auto"
      >
        <School size={18} />
        Guardar perfil académico
      </button>
    </form>
  );
};

const DocenteAcademicProfile = ({ user }) => {
  const { materias, grupos, asignaciones, agregarAsignacion } = useAcademico();
  const { usuarios } = useUsuarios();
  const { success, error } = useToast();

  const [form, setForm] = useState({
    plan: "2024",
    materiaId: "",
    grupoId: "",
    periodo: PERIODOS_ACADEMICOS[0],
  });
  const [errors, setErrors] = useState({});

  const materiasAsignables = useMemo(
    () =>
      materias
        .filter((materia) => String(materia.plan) === String(form.plan))
        .sort((a, b) => {
          const semestre = (a.semestreNumero || 99) - (b.semestreNumero || 99);
          if (semestre !== 0) return semestre;
          return String(a.nombre || "").localeCompare(String(b.nombre || ""), "es");
        }),
    [form.plan, materias]
  );

  const materiaSeleccionada = useMemo(
    () => getMateriaById(materias, form.materiaId),
    [form.materiaId, materias]
  );

  const gruposCompatibles = useMemo(() => {
    if (!materiaSeleccionada) return [];

    return getGruposOrdenados(
      grupos.filter(
        (grupo) =>
          grupo.carrera === materiaSeleccionada.carrera &&
          Number(grupo.semestreNumero) === Number(materiaSeleccionada.semestreNumero)
      )
    );
  }, [grupos, materiaSeleccionada]);

  const misAsignaciones = useMemo(
    () =>
      getAsignacionesPorDocente({ asignaciones, docenteId: user.id })
        .map((asignacion) => buildAsignacionDetalle({ asignacion, materias, grupos, usuarios }))
        .sort((a, b) => String(b.periodo).localeCompare(String(a.periodo))),
    [asignaciones, grupos, materias, user.id, usuarios]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => {
      const next = { ...prev, [name]: value };

      if (name === "plan") {
        next.materiaId = "";
        next.grupoId = "";
      }

      if (name === "materiaId") {
        next.grupoId = "";
      }

      return next;
    });

    if (errors[name] || errors.compatibilidad) {
      setErrors((prev) => ({ ...prev, [name]: "", compatibilidad: "" }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const grupoSeleccionado = getGrupoById(grupos, form.grupoId);
    const validationErrors = {
      plan: form.plan ? "" : "Selecciona un plan",
      materiaId: form.materiaId ? "" : "Selecciona una materia",
      grupoId: form.grupoId ? "" : "Selecciona un grupo compatible",
      periodo: form.periodo ? "" : "Selecciona un periodo",
      compatibilidad:
        materiaSeleccionada && grupoSeleccionado &&
        Number(materiaSeleccionada.semestreNumero) !== Number(grupoSeleccionado.semestreNumero)
          ? "El grupo no corresponde al semestre de la materia"
          : "",
    };

    if (Object.values(validationErrors).some(Boolean)) {
      setErrors(validationErrors);
      error("Revisa tu asignación académica");
      return;
    }

    const asignacionExiste = existeAsignacionDocente({
      asignaciones,
      profesorId: user.id,
      materiaId: form.materiaId,
      grupoId: form.grupoId,
      plan: form.plan,
      periodo: form.periodo,
    });

    if (asignacionExiste) {
      error("Ya tienes registrada esa materia y grupo en el periodo seleccionado");
      return;
    }

    agregarAsignacion({
      ...form,
      profesorId: user.id,
    });
    setForm({ plan: form.plan, materiaId: "", grupoId: "", periodo: form.periodo });
    setErrors({});
    success("Materia asignada a tu perfil docente");
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <form onSubmit={handleSubmit} className={`${cardClass} space-y-5`}>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#6A0032] dark:text-pink-200">
            Docente
          </p>
          <h2 className="mt-1 text-xl font-bold text-slate-800 dark:text-white">
            Registrar materia impartida
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Selecciona el plan, materia, grupo y periodo. El administrador podrá consultar estas asignaciones.
          </p>
        </div>

        <Field label="Plan de estudios" error={errors.plan}>
          <select name="plan" value={form.plan} onChange={handleChange} className={inputClass}>
            {PLANES_ESTUDIO.map((plan) => (
              <option key={plan} value={plan}>
                {getPlanLabel(plan)}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Materia" error={errors.materiaId}>
          <select
            name="materiaId"
            value={form.materiaId}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Selecciona una materia</option>
            {materiasAsignables.map((materia) => (
              <option key={materia.id} value={materia.id}>
                {materia.nombre} · {materia.semestre} · {materia.tipo || "Obligatoria"}
              </option>
            ))}
          </select>
        </Field>

        {materiaSeleccionada && (
          <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-900 dark:border-blue-900/40 dark:bg-blue-900/20 dark:text-blue-100">
            <p className="font-semibold">Semestre detectado: {materiaSeleccionada.semestre}</p>
            <p className="mt-1">Sólo se muestran grupos compatibles con esa materia.</p>
          </div>
        )}

        <Field label="Grupo" error={errors.grupoId}>
          <select
            name="grupoId"
            value={form.grupoId}
            onChange={handleChange}
            className={inputClass}
            disabled={!materiaSeleccionada}
          >
            <option value="">
              {materiaSeleccionada ? "Selecciona un grupo" : "Primero selecciona una materia"}
            </option>
            {gruposCompatibles.map((grupo) => (
              <option key={grupo.id} value={grupo.id}>
                {grupo.nombre} · {grupo.semestre} · {grupo.turno}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Periodo" error={errors.periodo}>
          <select name="periodo" value={form.periodo} onChange={handleChange} className={inputClass}>
            {PERIODOS_ACADEMICOS.map((periodo) => (
              <option key={periodo} value={periodo}>
                {periodo}
              </option>
            ))}
          </select>
        </Field>

        <FormError message={errors.compatibilidad} />

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#6A0032] px-5 py-3 font-semibold text-white transition hover:opacity-90 sm:w-auto"
        >
          <Layers3 size={18} />
          Registrar en mi perfil docente
        </button>
      </form>

      <section className={`${cardClass} space-y-4`}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Mis materias y grupos</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Estas asignaciones serán la base para publicar avisos, eventos y documentos dirigidos a tus grupos.
            </p>
          </div>
          <Link
            to={ROUTES.DOCENTE_PUBLICACIONES}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#6A0032] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
          >
            <ClipboardList size={16} />
            Publicar
          </Link>
        </div>

        {misAsignaciones.length === 0 ? (
          <EmptyAcademicState
            title="Aún no tienes materias asignadas"
            message="Registra una materia impartida o solicita al administrador que te asigne una desde el módulo académico."
          />
        ) : (
          <div className="space-y-3">
            {misAsignaciones.map((asignacion) => (
              <AsignacionCard key={asignacion.id} asignacion={asignacion} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

const AdminAcademicHint = () => (
  <section className={cardClass}>
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#6A0032] dark:text-pink-200">
          Administración académica
        </p>
        <h2 className="mt-1 text-xl font-bold text-slate-800 dark:text-white">
          Gestión académica centralizada
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Como administrador puedes consultar materias, grupos y asignaciones docentes desde el módulo académico.
        </p>
      </div>
      <Link
        to={ROUTES.ADMIN_ACADEMICO}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#6A0032] px-5 py-3 font-semibold text-white transition hover:opacity-90"
      >
        <ClipboardList size={18} />
        Ir a Académico
      </Link>
    </div>
  </section>
);

export const AcademicProfileSection = ({ user, onSaveAcademicProfile }) => {
  const role = normalizeRole(user?.rol);

  if (role === ROLES.ALUMNO) {
    return <AlumnoAcademicProfile user={user} onSave={onSaveAcademicProfile} />;
  }

  if (role === ROLES.DOCENTE) {
    return <DocenteAcademicProfile user={user} />;
  }

  if (role === ROLES.ADMIN || role === ROLES.SUPERADMIN) {
    return <AdminAcademicHint />;
  }

  return (
    <section className={cardClass}>
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-slate-100 p-3 text-slate-600 dark:bg-slate-700 dark:text-slate-200">
          <GraduationCap size={22} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">Perfil académico</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Este apartado se habilita principalmente para alumnos y docentes. El personal administrativo puede consultar la información desde los módulos correspondientes.
          </p>
        </div>
      </div>
    </section>
  );
};
