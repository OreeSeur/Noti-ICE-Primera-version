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
  CARRERA_ICE,
  CARRERAS_ACADEMICAS,
  getPlanLabel,
  OPCIONES_OPTATIVAS,
  PERIODOS_ACADEMICOS,
  PLANES_ESTUDIO,
  SEMESTRES_ACADEMICOS,
  TIPOS_MATERIA,
} from "../../../constants/academic";
import { ROLES, getRoleLabel, normalizeRole } from "../../../constants/roles";
import { useAcademico } from "../../../context/academico/useAcademico";
import { useToast } from "../../../context/toast/useToast";
import { useUsuarios } from "../../../context/usuarios/useUsuarios";
import {
  asignacionCoincideConPlan,
  getGrupoFormatoAyuda,
  materiaCoincideConPlan,
  parseGrupoNombre,
} from "../../../utils/academic";
import { matchesSearch } from "../../../utils/search";

const crearMateriaVacia = (plan = "2024") => ({
  clave: "",
  nombre: "",
  plan,
  carrera: CARRERA_ICE,
  semestre: SEMESTRES_ACADEMICOS[0],
  semestreNumero: 1,
  tipo: TIPOS_MATERIA[0],
  opcion: "",
  area: AREAS_MATERIA[0],
});

const emptyGrupo = {
  nombre: "",
  carrera: CARRERA_ICE,
  semestre: SEMESTRES_ACADEMICOS[0],
  semestreNumero: 1,
  turno: "Matutino",
  turnoCodigo: "CM",
  numeroGrupo: 1,
};

const crearAsignacionVacia = (plan = "2024") => ({
  plan,
  profesorId: "",
  materiaId: "",
  grupoId: "",
  periodo: PERIODOS_ACADEMICOS[0],
});

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

const PlanButton = ({ active, plan, count, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`rounded-2xl border px-5 py-4 text-left transition ${
      active
        ? "border-[#6A0032] bg-[#6A0032] text-white shadow-md"
        : "border-slate-200 bg-white text-slate-700 hover:border-[#6A0032]/50 hover:bg-[#6A0032]/5 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
    }`}
  >
    <span className="block text-xs font-bold uppercase tracking-[0.18em] opacity-80">
      Plan de estudios
    </span>
    <span className="mt-1 block text-xl font-bold">{getPlanLabel(plan)}</span>
    <span className="mt-1 block text-sm opacity-80">{count} materias registradas</span>
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

const getMateria = (materias, materiaId) =>
  materias.find((materia) => String(materia.id) === String(materiaId));

const getNombreMateria = (materias, materiaId) =>
  getMateria(materias, materiaId)?.nombre || "Materia no encontrada";

const getGrupo = (grupos, grupoId) =>
  grupos.find((grupo) => String(grupo.id) === String(grupoId));

const validateMateria = (materia) => ({
  clave: materia.clave.trim().length < 3 ? "La clave debe tener al menos 3 caracteres" : "",
  nombre:
    materia.nombre.trim().length < 5
      ? "El nombre de la materia debe tener al menos 5 caracteres"
      : "",
  plan: !materia.plan ? "Selecciona un plan" : "",
  tipo: !materia.tipo ? "Selecciona un tipo" : "",
  opcion:
    materia.tipo === "Optativa" && !materia.opcion
      ? "Selecciona la opción de la optativa"
      : "",
});

const validateGrupo = (grupo) => ({
  nombre: !parseGrupoNombre(grupo.nombre) ? getGrupoFormatoAyuda() : "",
});

const validateAsignacion = (asignacion) => ({
  plan: !asignacion.plan ? "Selecciona un plan" : "",
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
  const [selectedPlan, setSelectedPlan] = useState("2024");
  const [search, setSearch] = useState("");
  const [materiaForm, setMateriaForm] = useState(() => crearMateriaVacia("2024"));
  const [grupoForm, setGrupoForm] = useState(emptyGrupo);
  const [asignacionForm, setAsignacionForm] = useState(() => crearAsignacionVacia("2024"));
  const [materiaErrors, setMateriaErrors] = useState({});
  const [grupoErrors, setGrupoErrors] = useState({});
  const [asignacionErrors, setAsignacionErrors] = useState({});

  const docentes = useMemo(
    () => usuarios.filter((usuario) => normalizeRole(usuario.rol) === ROLES.DOCENTE),
    [usuarios]
  );

  const cambiarPlan = (plan) => {
    setSelectedPlan(plan);
    setSearch("");
    setMateriaForm(crearMateriaVacia(plan));
    setAsignacionForm(crearAsignacionVacia(plan));
    setMateriaErrors({});
    setAsignacionErrors({});
  };

  const materiasDelPlan = useMemo(
    () => materias.filter((materia) => materiaCoincideConPlan(materia, selectedPlan)),
    [materias, selectedPlan]
  );

  const materiasFiltradas = useMemo(
    () =>
      materiasDelPlan.filter((materia) =>
        matchesSearch(
          materia,
          ["clave", "nombre", "plan", "carrera", "semestre", "area", "tipo", "opcion"],
          search
        )
      ),
    [materiasDelPlan, search]
  );

  const gruposFiltrados = useMemo(
    () =>
      grupos.filter((grupo) =>
        matchesSearch(
          grupo,
          ["nombre", "carrera", "semestre", "turno", "turnoCodigo", "numeroGrupo"],
          search
        )
      ),
    [grupos, search]
  );

  const asignacionesDelPlan = useMemo(
    () =>
      asignaciones.filter((asignacion) =>
        asignacionCoincideConPlan(asignacion, materias, selectedPlan)
      ),
    [asignaciones, materias, selectedPlan]
  );

  const asignacionesFiltradas = useMemo(
    () =>
      asignacionesDelPlan.filter((asignacion) => {
        const materia = getMateria(materias, asignacion.materiaId);
        const grupo = getGrupo(grupos, asignacion.grupoId);
        const item = {
          ...asignacion,
          profesor: getNombreProfesor(usuarios, asignacion.profesorId),
          materia: materia?.nombre || "Materia no encontrada",
          grupo: grupo?.nombre || "Grupo no encontrado",
          semestre: grupo?.semestre || materia?.semestre || "",
          turno: grupo?.turno || "",
          plan: asignacion.plan || materia?.plan || "",
        };

        return matchesSearch(
          item,
          ["profesor", "materia", "grupo", "semestre", "turno", "periodo", "plan"],
          search
        );
      }),
    [asignacionesDelPlan, grupos, materias, search, usuarios]
  );

  const planCounts = useMemo(
    () =>
      PLANES_ESTUDIO.reduce((acc, plan) => {
        acc[plan] = materias.filter((materia) => materiaCoincideConPlan(materia, plan)).length;
        return acc;
      }, {}),
    [materias]
  );

  const handleMateriaChange = (event) => {
    const { name, value } = event.target;
    setMateriaForm((prev) => {
      const next = { ...prev, [name]: value };

      if (name === "semestre") {
        const match = String(value).match(/\d+/);
        next.semestreNumero = match ? Number(match[0]) : null;
      }

      if (name === "tipo" && value !== "Optativa") {
        next.opcion = "";
      }

      if (name === "opcion" && value) {
        next.area = value === "Cibernética / Control" ? "Control" : value;
      }

      return next;
    });
    if (materiaErrors[name]) setMateriaErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleGrupoChange = (event) => {
    const { value } = event.target;
    const datosGrupo = parseGrupoNombre(value);

    setGrupoForm((prev) => ({
      ...prev,
      nombre: value.toUpperCase(),
      ...(datosGrupo || {}),
    }));

    if (grupoErrors.nombre) setGrupoErrors((prev) => ({ ...prev, nombre: "" }));
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
    setMateriaForm(crearMateriaVacia(selectedPlan));
    success("Materia registrada correctamente");
  };

  const handleGrupoSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateGrupo(grupoForm);

    if (hasErrors(validationErrors)) {
      setGrupoErrors(validationErrors);
      error("Revisa el formato del grupo");
      return;
    }

    const datosGrupo = parseGrupoNombre(grupoForm.nombre);
    const existeGrupo = grupos.some(
      (grupo) => grupo.nombre.toUpperCase() === datosGrupo.nombre.toUpperCase()
    );

    if (existeGrupo) {
      error("Ese grupo ya existe en el catálogo");
      return;
    }

    agregarGrupo(datosGrupo);
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
        String(asignacion.plan || selectedPlan) === String(asignacionForm.plan) &&
        asignacion.periodo === asignacionForm.periodo
    );

    if (existeAsignacion) {
      error("Esa asignación ya existe para el periodo seleccionado");
      return;
    }

    agregarAsignacion(asignacionForm);
    setAsignacionForm(crearAsignacionVacia(selectedPlan));
    success("Asignación registrada correctamente");
  };

  const materiasAsignables = useMemo(
    () => materias.filter((materia) => materiaCoincideConPlan(materia, asignacionForm.plan)),
    [asignacionForm.plan, materias]
  );

  const gruposCompatibles = useMemo(() => {
    const materia = getMateria(materias, asignacionForm.materiaId);

    if (!materia) return grupos;

    return grupos.filter(
      (grupo) => grupo.carrera === materia.carrera && grupo.semestre === materia.semestre
    );
  }, [asignacionForm.materiaId, grupos, materias]);

  const grupoPreview = parseGrupoNombre(grupoForm.nombre);

  const resumen = [
    {
      title: `Materias ${getPlanLabel(selectedPlan)}`,
      value: materiasDelPlan.length,
      description: "Catálogo filtrado por plan de estudios",
      icon: BookOpen,
    },
    {
      title: "Grupos",
      value: grupos.length,
      description: "Formato 1CM1 a 9CV12",
      icon: Users,
    },
    {
      title: `Asignaciones ${getPlanLabel(selectedPlan)}`,
      value: asignacionesDelPlan.length,
      description: "Relaciones docente-materia-grupo del plan activo",
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
        eyebrow="Fase 2.12.1"
        title="Planes de estudio y estructura académica"
        description="Administra materias separadas por Plan 2003 y Plan 2024, grupos con nomenclatura real y asignaciones docente-materia-grupo."
      />

      <div className="grid gap-3 md:grid-cols-2">
        {PLANES_ESTUDIO.map((plan) => (
          <PlanButton
            key={plan}
            plan={plan}
            count={planCounts[plan] || 0}
            active={selectedPlan === plan}
            onClick={() => cambiarPlan(plan)}
          />
        ))}
      </div>

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
                Registrar materia en {getPlanLabel(selectedPlan)}
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                El catálogo sólo guarda plan, semestre, nombre, tipo y opción cuando aplique.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Plan" error={materiaErrors.plan}>
                <select
                  name="plan"
                  value={materiaForm.plan}
                  onChange={(event) => {
                    handleMateriaChange(event);
                    setSelectedPlan(event.target.value);
                  }}
                  className={inputClass}
                >
                  <OptionList options={PLANES_ESTUDIO} />
                </select>
              </Field>

              <Field label="Tipo" error={materiaErrors.tipo}>
                <select
                  name="tipo"
                  value={materiaForm.tipo}
                  onChange={handleMateriaChange}
                  className={inputClass}
                >
                  <OptionList options={TIPOS_MATERIA} />
                </select>
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Clave interna" error={materiaErrors.clave}>
                <input
                  name="clave"
                  value={materiaForm.clave}
                  onChange={handleMateriaChange}
                  className={inputClass}
                  placeholder="Ej. ICE-2024-PROG"
                />
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

            <Field label="Nombre de la materia" error={materiaErrors.nombre}>
              <input
                name="nombre"
                value={materiaForm.nombre}
                onChange={handleMateriaChange}
                className={inputClass}
                placeholder="Ej. Programación avanzada"
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

            {materiaForm.tipo === "Optativa" && (
              <Field label="Opción de optativa" error={materiaErrors.opcion}>
                <select
                  name="opcion"
                  value={materiaForm.opcion}
                  onChange={handleMateriaChange}
                  className={inputClass}
                >
                  <option value="">Selecciona una opción</option>
                  <OptionList options={OPCIONES_OPTATIVAS} />
                </select>
              </Field>
            )}

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#6A0032] px-5 py-3 font-semibold text-white transition hover:opacity-90 sm:w-auto"
            >
              <Plus size={18} />
              Guardar materia
            </button>
          </form>

          <AdminTableWrapper>
            <table className="w-full min-w-[860px]">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-700">
                  <th className="p-4 text-left">Materia</th>
                  <th className="p-4 text-left">Plan</th>
                  <th className="p-4 text-left">Semestre</th>
                  <th className="p-4 text-left">Tipo</th>
                  <th className="p-4 text-left">Área / opción</th>
                  <th className="p-4 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {materiasFiltradas.length === 0 ? (
                  <EmptyState
                    colSpan={6}
                    title="No se encontraron materias"
                    message="Registra una nueva materia o cambia la búsqueda del plan activo."
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
                      <td className="p-4"><StatusBadge label={getPlanLabel(materia.plan)} variant="primary" /></td>
                      <td className="p-4"><StatusBadge label={materia.semestre} variant="info" /></td>
                      <td className="p-4"><StatusBadge label={materia.tipo || "Obligatoria"} variant={materia.tipo === "Optativa" ? "warning" : "success"} /></td>
                      <td className="p-4 text-slate-600 dark:text-slate-300">
                        {materia.opcion || materia.area}
                      </td>
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
                El semestre, turno y número se detectan desde el nombre del grupo.
              </p>
            </div>

            <Field label="Nombre del grupo" error={grupoErrors.nombre}>
              <input
                name="nombre"
                value={grupoForm.nombre}
                onChange={handleGrupoChange}
                className={inputClass}
                placeholder="Ej. 1CM1, 1CM12, 1CV1 o 1CV12"
              />
            </Field>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm dark:border-slate-700 dark:bg-slate-900/40">
              {grupoPreview ? (
                <div className="grid gap-2 sm:grid-cols-2">
                  <p><strong>Semestre:</strong> {grupoPreview.semestre}</p>
                  <p><strong>Turno:</strong> {grupoPreview.turno}</p>
                  <p><strong>Código:</strong> {grupoPreview.turnoCodigo}</p>
                  <p><strong>Número:</strong> {grupoPreview.numeroGrupo}</p>
                </div>
              ) : (
                <p className="text-slate-500 dark:text-slate-400">{getGrupoFormatoAyuda()}</p>
              )}
            </div>

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
              gruposFiltrados.slice(0, 60).map((grupo) => (
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
                    <StatusBadge label={grupo.turnoCodigo || grupo.turno} variant="success" />
                  </div>

                  <div className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    <p>{grupo.carrera}</p>
                    <p>{grupo.semestre} · {grupo.turno}</p>
                    <p>Número de grupo: {grupo.numeroGrupo || "No definido"}</p>
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
            {gruposFiltrados.length > 60 && (
              <div className="md:col-span-2 rounded-2xl bg-slate-100 p-4 text-center text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                Mostrando 60 de {gruposFiltrados.length} grupos. Usa el buscador para ubicar un grupo específico.
              </div>
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
                Primero selecciona el plan. Después elige materia y grupo compatible por semestre.
              </p>
            </div>

            <Field label="Plan" error={asignacionErrors.plan}>
              <select
                name="plan"
                value={asignacionForm.plan}
                onChange={(event) => {
                  handleAsignacionChange(event);
                  setSelectedPlan(event.target.value);
                  setAsignacionForm((prev) => ({
                    ...prev,
                    plan: event.target.value,
                    materiaId: "",
                    grupoId: "",
                  }));
                }}
                className={inputClass}
              >
                <OptionList options={PLANES_ESTUDIO} />
              </select>
            </Field>

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
                {materiasAsignables.map((materia) => (
                  <option key={materia.id} value={materia.id}>
                    {materia.nombre} · {materia.semestre} · {materia.tipo || "Obligatoria"}
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
                    {grupo.nombre} · {grupo.semestre} · {grupo.turno}
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
                message="Relaciona un docente con una materia y un grupo del plan activo."
              />
            ) : (
              asignacionesFiltradas.map((asignacion) => {
                const materia = getMateria(materias, asignacion.materiaId);
                const grupo = getGrupo(grupos, asignacion.grupoId);

                return (
                  <article
                    key={asignacion.id}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="flex flex-wrap gap-2">
                          <StatusBadge label={getPlanLabel(asignacion.plan || materia?.plan)} variant="primary" />
                          <StatusBadge label={grupo?.nombre || "Grupo"} variant="success" />
                        </div>
                        <p className="mt-3 text-sm font-semibold text-[#6A0032] dark:text-pink-100">
                          {getNombreProfesor(usuarios, asignacion.profesorId)}
                        </p>
                        <h3 className="mt-1 text-xl font-bold text-slate-800 dark:text-white">
                          {getNombreMateria(materias, asignacion.materiaId)}
                        </h3>
                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                          {grupo?.semestre || materia?.semestre} · {grupo?.turno || "Turno no definido"} · Periodo {asignacion.periodo}
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
                );
              })
            )}
          </div>
        </div>
      )}
    </section>
  );
};
