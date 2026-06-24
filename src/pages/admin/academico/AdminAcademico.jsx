import { useMemo, useState } from "react";
import {
  BookOpen,
  ClipboardList,
  GraduationCap,
  Layers3,
  Plus,
  Trash2,
  Users,
} from "lucide-react";

import { AdminStatCard } from "../../../components/admin/AdminStatCard";
import { AdminTableWrapper } from "../../../components/common/AdminTableWrapper";
import { EmptyState } from "../../../components/common/EmptyState";
import { FormError } from "../../../components/common/FormError";
import { PageHeader } from "../../../components/common/PageHeader";
import { SearchInput } from "../../../components/common/SearchInput";
import { StatusBadge } from "../../../components/common/StatusBadge";
import {
  AREAS_MATERIA,
  CARRERAS_ACADEMICAS,
  PERIODOS_ACADEMICOS,
  SEMESTRES_ACADEMICOS,
  TURNOS_ACADEMICOS,
} from "../../../constants/academic";
import { ROLES, getRoleLabel, normalizeRole } from "../../../constants/roles";
import { useAcademico } from "../../../context/academico/useAcademico";
import { useToast } from "../../../context/toast/useToast";
import { useUsuarios } from "../../../context/usuarios/useUsuarios";
import { matchesSearch } from "../../../utils/search";

const emptyMateria = {
  clave: "",
  nombre: "",
  carrera: CARRERAS_ACADEMICAS[0],
  semestre: SEMESTRES_ACADEMICOS[0],
  area: AREAS_MATERIA[0],
};

const emptyGrupo = {
  nombre: "",
  carrera: CARRERAS_ACADEMICAS[0],
  semestre: SEMESTRES_ACADEMICOS[0],
  turno: TURNOS_ACADEMICOS[0],
};

const emptyAsignacion = {
  profesorId: "",
  materiaId: "",
  grupoId: "",
  periodo: PERIODOS_ACADEMICOS[0],
};

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:ring-2 focus:ring-[#6A0032] dark:border-slate-600 dark:bg-slate-700 dark:text-white";

const labelClass = "text-sm font-semibold text-slate-700 dark:text-slate-200";

const TabButton = ({ active, children, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
      active
        ? "bg-[#6A0032] text-white shadow-sm"
        : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
    }`}
  >
    {children}
  </button>
);

const Field = ({ label, error, children }) => (
  <label className="space-y-2">
    <span className={labelClass}>{label}</span>
    {children}
    <FormError message={error} />
  </label>
);

const OptionList = ({ options }) =>
  options.map((option) => (
    <option key={option} value={option}>
      {option}
    </option>
  ));

const getNombreProfesor = (usuarios, profesorId) =>
  usuarios.find((usuario) => String(usuario.id) === String(profesorId))?.nombre ||
  "Docente no encontrado";

const getNombreMateria = (materias, materiaId) =>
  materias.find((materia) => String(materia.id) === String(materiaId))?.nombre ||
  "Materia no encontrada";

const getNombreGrupo = (grupos, grupoId) =>
  grupos.find((grupo) => String(grupo.id) === String(grupoId))?.nombre ||
  "Grupo no encontrado";

const validateMateria = (materia) => ({
  clave: materia.clave.trim().length < 3 ? "La clave debe tener al menos 3 caracteres" : "",
  nombre:
    materia.nombre.trim().length < 5
      ? "El nombre de la materia debe tener al menos 5 caracteres"
      : "",
});

const validateGrupo = (grupo) => ({
  nombre: grupo.nombre.trim().length < 3 ? "El grupo debe tener al menos 3 caracteres" : "",
});

const validateAsignacion = (asignacion) => ({
  profesorId: !asignacion.profesorId ? "Selecciona un docente" : "",
  materiaId: !asignacion.materiaId ? "Selecciona una materia" : "",
  grupoId: !asignacion.grupoId ? "Selecciona un grupo" : "",
});

const hasErrors = (errors) => Object.values(errors).some(Boolean);

export const AdminAcademico = () => {
  const {
    materias,
    grupos,
    asignaciones,
    agregarMateria,
    eliminarMateria,
    agregarGrupo,
    eliminarGrupo,
    agregarAsignacion,
    eliminarAsignacion,
  } = useAcademico();
  const { usuarios } = useUsuarios();
  const { success, error } = useToast();

  const [activeTab, setActiveTab] = useState("materias");
  const [search, setSearch] = useState("");
  const [materiaForm, setMateriaForm] = useState(emptyMateria);
  const [grupoForm, setGrupoForm] = useState(emptyGrupo);
  const [asignacionForm, setAsignacionForm] = useState(emptyAsignacion);
  const [materiaErrors, setMateriaErrors] = useState({});
  const [grupoErrors, setGrupoErrors] = useState({});
  const [asignacionErrors, setAsignacionErrors] = useState({});

  const docentes = useMemo(
    () => usuarios.filter((usuario) => normalizeRole(usuario.rol) === ROLES.DOCENTE),
    [usuarios]
  );

  const materiasFiltradas = useMemo(
    () =>
      materias.filter((materia) =>
        matchesSearch(materia, ["clave", "nombre", "carrera", "semestre", "area"], search)
      ),
    [materias, search]
  );

  const gruposFiltrados = useMemo(
    () =>
      grupos.filter((grupo) =>
        matchesSearch(grupo, ["nombre", "carrera", "semestre", "turno"], search)
      ),
    [grupos, search]
  );

  const asignacionesFiltradas = useMemo(
    () =>
      asignaciones.filter((asignacion) => {
        const item = {
          ...asignacion,
          profesor: getNombreProfesor(usuarios, asignacion.profesorId),
          materia: getNombreMateria(materias, asignacion.materiaId),
          grupo: getNombreGrupo(grupos, asignacion.grupoId),
        };

        return matchesSearch(item, ["profesor", "materia", "grupo", "periodo"], search);
      }),
    [asignaciones, grupos, materias, search, usuarios]
  );

  const handleMateriaChange = (event) => {
    const { name, value } = event.target;
    setMateriaForm((prev) => ({ ...prev, [name]: value }));
    if (materiaErrors[name]) setMateriaErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleGrupoChange = (event) => {
    const { name, value } = event.target;
    setGrupoForm((prev) => ({ ...prev, [name]: value }));
    if (grupoErrors[name]) setGrupoErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleAsignacionChange = (event) => {
    const { name, value } = event.target;
    setAsignacionForm((prev) => ({ ...prev, [name]: value }));
    if (asignacionErrors[name]) {
      setAsignacionErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleMateriaSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateMateria(materiaForm);

    if (hasErrors(validationErrors)) {
      setMateriaErrors(validationErrors);
      error("Revisa los datos de la materia");
      return;
    }

    agregarMateria(materiaForm);
    setMateriaForm(emptyMateria);
    success("Materia registrada correctamente");
  };

  const handleGrupoSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateGrupo(grupoForm);

    if (hasErrors(validationErrors)) {
      setGrupoErrors(validationErrors);
      error("Revisa los datos del grupo");
      return;
    }

    agregarGrupo(grupoForm);
    setGrupoForm(emptyGrupo);
    success("Grupo registrado correctamente");
  };

  const handleAsignacionSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateAsignacion(asignacionForm);

    if (hasErrors(validationErrors)) {
      setAsignacionErrors(validationErrors);
      error("Revisa los datos de la asignación");
      return;
    }

    const existeAsignacion = asignaciones.some(
      (asignacion) =>
        String(asignacion.profesorId) === String(asignacionForm.profesorId) &&
        String(asignacion.materiaId) === String(asignacionForm.materiaId) &&
        String(asignacion.grupoId) === String(asignacionForm.grupoId) &&
        asignacion.periodo === asignacionForm.periodo
    );

    if (existeAsignacion) {
      error("Esa asignación ya existe para el periodo seleccionado");
      return;
    }

    agregarAsignacion(asignacionForm);
    setAsignacionForm(emptyAsignacion);
    success("Asignación registrada correctamente");
  };

  const gruposCompatibles = useMemo(() => {
    const materia = materias.find(
      (item) => String(item.id) === String(asignacionForm.materiaId)
    );

    if (!materia) return grupos;

    return grupos.filter(
      (grupo) => grupo.carrera === materia.carrera && grupo.semestre === materia.semestre
    );
  }, [asignacionForm.materiaId, grupos, materias]);

  const resumen = [
    {
      title: "Materias",
      value: materias.length,
      description: "Catálogo académico disponible",
      icon: BookOpen,
    },
    {
      title: "Grupos",
      value: grupos.length,
      description: "Grupos activos por carrera y semestre",
      icon: Users,
    },
    {
      title: "Asignaciones",
      value: asignaciones.length,
      description: "Relaciones docente-materia-grupo",
      icon: ClipboardList,
    },
    {
      title: "Docentes",
      value: docentes.length,
      description: `${getRoleLabel(ROLES.DOCENTE)}s registrados`,
      icon: GraduationCap,
    },
  ];

  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Fase 2.12"
        title="Estructura académica"
        description="Administra materias, grupos y asignaciones de docentes. Esta base permitirá que los profesores publiquen contenido para sus grupos y que los alumnos reciban avisos por materia."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {resumen.map((item) => (
          <AdminStatCard key={item.title} {...item} />
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            <TabButton active={activeTab === "materias"} onClick={() => setActiveTab("materias")}>
              Materias
            </TabButton>
            <TabButton active={activeTab === "grupos"} onClick={() => setActiveTab("grupos")}>
              Grupos
            </TabButton>
            <TabButton
              active={activeTab === "asignaciones"}
              onClick={() => setActiveTab("asignaciones")}
            >
              Asignaciones
            </TabButton>
          </div>

          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Buscar en estructura académica..."
            className="lg:max-w-sm"
          />
        </div>
      </div>

      {activeTab === "materias" && (
        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <form
            onSubmit={handleMateriaSubmit}
            className="space-y-4 rounded-2xl bg-white p-5 shadow-md dark:bg-slate-800"
          >
            <div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-white">
                Registrar materia
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Define la materia por carrera, semestre y área académica.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Clave" error={materiaErrors.clave}>
                <input
                  name="clave"
                  value={materiaForm.clave}
                  onChange={handleMateriaChange}
                  className={inputClass}
                  placeholder="Ej. COMP-601"
                />
              </Field>

              <Field label="Área" error={materiaErrors.area}>
                <select
                  name="area"
                  value={materiaForm.area}
                  onChange={handleMateriaChange}
                  className={inputClass}
                >
                  <OptionList options={AREAS_MATERIA} />
                </select>
              </Field>
            </div>

            <Field label="Nombre de la materia" error={materiaErrors.nombre}>
              <input
                name="nombre"
                value={materiaForm.nombre}
                onChange={handleMateriaChange}
                className={inputClass}
                placeholder="Ej. Bases de Datos"
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Carrera" error={materiaErrors.carrera}>
                <select
                  name="carrera"
                  value={materiaForm.carrera}
                  onChange={handleMateriaChange}
                  className={inputClass}
                >
                  <OptionList options={CARRERAS_ACADEMICAS} />
                </select>
              </Field>

              <Field label="Semestre" error={materiaErrors.semestre}>
                <select
                  name="semestre"
                  value={materiaForm.semestre}
                  onChange={handleMateriaChange}
                  className={inputClass}
                >
                  <OptionList options={SEMESTRES_ACADEMICOS} />
                </select>
              </Field>
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#6A0032] px-5 py-3 font-semibold text-white transition hover:opacity-90 sm:w-auto"
            >
              <Plus size={18} />
              Guardar materia
            </button>
          </form>

          <AdminTableWrapper>
            <table className="w-full min-w-[760px]">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-700">
                  <th className="p-4 text-left">Materia</th>
                  <th className="p-4 text-left">Carrera</th>
                  <th className="p-4 text-left">Semestre</th>
                  <th className="p-4 text-left">Área</th>
                  <th className="p-4 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {materiasFiltradas.length === 0 ? (
                  <EmptyState
                    colSpan={5}
                    title="No se encontraron materias"
                    message="Registra una nueva materia o cambia la búsqueda."
                  />
                ) : (
                  materiasFiltradas.map((materia) => (
                    <tr key={materia.id} className="border-b border-slate-200 dark:border-slate-700">
                      <td className="p-4">
                        <p className="font-semibold text-slate-800 dark:text-white">
                          {materia.nombre}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {materia.clave}
                        </p>
                      </td>
                      <td className="p-4 text-slate-600 dark:text-slate-300">{materia.carrera}</td>
                      <td className="p-4"><StatusBadge label={materia.semestre} variant="info" /></td>
                      <td className="p-4"><StatusBadge label={materia.area} variant="primary" /></td>
                      <td className="p-4 text-center">
                        <button
                          type="button"
                          onClick={() => eliminarMateria(materia.id)}
                          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-900/30"
                        >
                          <Trash2 size={16} />
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </AdminTableWrapper>
        </div>
      )}

      {activeTab === "grupos" && (
        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <form
            onSubmit={handleGrupoSubmit}
            className="space-y-4 rounded-2xl bg-white p-5 shadow-md dark:bg-slate-800"
          >
            <div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-white">
                Registrar grupo
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Relaciona cada grupo con carrera, semestre y turno.
              </p>
            </div>

            <Field label="Nombre del grupo" error={grupoErrors.nombre}>
              <input
                name="nombre"
                value={grupoForm.nombre}
                onChange={handleGrupoChange}
                className={inputClass}
                placeholder="Ej. 6CV1"
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Carrera" error={grupoErrors.carrera}>
                <select
                  name="carrera"
                  value={grupoForm.carrera}
                  onChange={handleGrupoChange}
                  className={inputClass}
                >
                  <OptionList options={CARRERAS_ACADEMICAS} />
                </select>
              </Field>

              <Field label="Semestre" error={grupoErrors.semestre}>
                <select
                  name="semestre"
                  value={grupoForm.semestre}
                  onChange={handleGrupoChange}
                  className={inputClass}
                >
                  <OptionList options={SEMESTRES_ACADEMICOS} />
                </select>
              </Field>
            </div>

            <Field label="Turno" error={grupoErrors.turno}>
              <select
                name="turno"
                value={grupoForm.turno}
                onChange={handleGrupoChange}
                className={inputClass}
              >
                <OptionList options={TURNOS_ACADEMICOS} />
              </select>
            </Field>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#6A0032] px-5 py-3 font-semibold text-white transition hover:opacity-90 sm:w-auto"
            >
              <Plus size={18} />
              Guardar grupo
            </button>
          </form>

          <div className="grid gap-4 md:grid-cols-2">
            {gruposFiltrados.length === 0 ? (
              <EmptyState
                title="No se encontraron grupos"
                message="Registra un grupo o cambia la búsqueda."
              />
            ) : (
              gruposFiltrados.map((grupo) => (
                <article
                  key={grupo.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6A0032] dark:text-pink-100">
                        Grupo
                      </p>
                      <h3 className="mt-1 text-2xl font-bold text-slate-800 dark:text-white">
                        {grupo.nombre}
                      </h3>
                    </div>
                    <StatusBadge label={grupo.turno} variant="success" />
                  </div>

                  <div className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    <p>{grupo.carrera}</p>
                    <p>{grupo.semestre}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => eliminarGrupo(grupo.id)}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-900/50 dark:text-red-300 dark:hover:bg-red-900/30"
                  >
                    <Trash2 size={16} />
                    Eliminar grupo
                  </button>
                </article>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === "asignaciones" && (
        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <form
            onSubmit={handleAsignacionSubmit}
            className="space-y-4 rounded-2xl bg-white p-5 shadow-md dark:bg-slate-800"
          >
            <div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-white">
                Asignar docente
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Relaciona profesor, materia y grupo. Esta relación se usará para publicaciones docentes.
              </p>
            </div>

            <Field label="Docente" error={asignacionErrors.profesorId}>
              <select
                name="profesorId"
                value={asignacionForm.profesorId}
                onChange={handleAsignacionChange}
                className={inputClass}
              >
                <option value="">Selecciona un docente</option>
                {docentes.map((docente) => (
                  <option key={docente.id} value={docente.id}>
                    {docente.nombre} · {docente.correo}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Materia" error={asignacionErrors.materiaId}>
              <select
                name="materiaId"
                value={asignacionForm.materiaId}
                onChange={(event) => {
                  handleAsignacionChange(event);
                  setAsignacionForm((prev) => ({ ...prev, grupoId: "" }));
                }}
                className={inputClass}
              >
                <option value="">Selecciona una materia</option>
                {materias.map((materia) => (
                  <option key={materia.id} value={materia.id}>
                    {materia.nombre} · {materia.semestre}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Grupo compatible" error={asignacionErrors.grupoId}>
              <select
                name="grupoId"
                value={asignacionForm.grupoId}
                onChange={handleAsignacionChange}
                className={inputClass}
              >
                <option value="">Selecciona un grupo</option>
                {gruposCompatibles.map((grupo) => (
                  <option key={grupo.id} value={grupo.id}>
                    {grupo.nombre} · {grupo.carrera} · {grupo.semestre}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Periodo" error={asignacionErrors.periodo}>
              <select
                name="periodo"
                value={asignacionForm.periodo}
                onChange={handleAsignacionChange}
                className={inputClass}
              >
                <OptionList options={PERIODOS_ACADEMICOS} />
              </select>
            </Field>

            {docentes.length === 0 && (
              <div className="rounded-xl bg-yellow-50 p-4 text-sm text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-100">
                No hay docentes registrados. Crea un usuario con rol docente para poder asignarlo.
              </div>
            )}

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#6A0032] px-5 py-3 font-semibold text-white transition hover:opacity-90 sm:w-auto"
            >
              <Layers3 size={18} />
              Guardar asignación
            </button>
          </form>

          <div className="space-y-4">
            {asignacionesFiltradas.length === 0 ? (
              <EmptyState
                title="No se encontraron asignaciones"
                message="Relaciona un docente con una materia y un grupo."
              />
            ) : (
              asignacionesFiltradas.map((asignacion) => (
                <article
                  key={asignacion.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-[#6A0032] dark:text-pink-100">
                        {getNombreProfesor(usuarios, asignacion.profesorId)}
                      </p>
                      <h3 className="mt-1 text-xl font-bold text-slate-800 dark:text-white">
                        {getNombreMateria(materias, asignacion.materiaId)}
                      </h3>
                      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Grupo {getNombreGrupo(grupos, asignacion.grupoId)} · Periodo {asignacion.periodo}
                      </p>
                    </div>
                    <StatusBadge label="Asignación activa" variant="success" />
                  </div>

                  <button
                    type="button"
                    onClick={() => eliminarAsignacion(asignacion.id)}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-900/50 dark:text-red-300 dark:hover:bg-red-900/30 sm:w-auto"
                  >
                    <Trash2 size={16} />
                    Eliminar asignación
                  </button>
                </article>
              ))
            )}
          </div>
        </div>
      )}
    </section>
  );
};
