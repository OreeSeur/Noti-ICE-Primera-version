import { BadgeCheck, BookOpen, GraduationCap, Mail, User } from "lucide-react";
import { getRoleLabel } from "../../constants/roles";

export const ProfileSummaryCard = ({ usuario }) => {
  const inicial = usuario.nombre?.charAt(0)?.toUpperCase() || "U";

  return (
    <article className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-8">
      <div className="flex flex-col gap-8 md:flex-row md:items-center">
        <div className="w-32 h-32 rounded-full bg-[#6A0032] flex items-center justify-center text-white text-5xl font-bold">
          {inicial || <User size={60} />}
        </div>

        <div className="flex-1">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#6A0032] dark:text-pink-300">
            {getRoleLabel(usuario.rol)}
          </p>
          <h2 className="mt-1 text-2xl font-bold text-slate-800 dark:text-white">
            {usuario.nombre || "Usuario sin nombre"}
          </h2>
          <p className="mt-2 text-slate-500 dark:text-slate-400 break-all">
            {usuario.correo || "Sin correo registrado"}
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-700/60">
          <div className="mb-2 flex items-center gap-2 font-semibold text-slate-700 dark:text-white">
            <BadgeCheck size={18} /> Boleta
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-300">
            {usuario.boleta || "No registrada"}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-700/60">
          <div className="mb-2 flex items-center gap-2 font-semibold text-slate-700 dark:text-white">
            <GraduationCap size={18} /> Carrera
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-300">
            {usuario.carrera || "No registrada"}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-700/60">
          <div className="mb-2 flex items-center gap-2 font-semibold text-slate-700 dark:text-white">
            <BookOpen size={18} /> Semestre
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-300">
            {usuario.semestre || "No registrado"}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-700/60">
          <div className="mb-2 flex items-center gap-2 font-semibold text-slate-700 dark:text-white">
            <Mail size={18} /> Estado
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-300 capitalize">
            {usuario.estado || "Activo"}
          </p>
        </div>
      </div>
    </article>
  );
};
