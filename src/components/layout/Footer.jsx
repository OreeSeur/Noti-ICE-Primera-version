import ipnLogo from "../../assets/images/ipn-logo.webp";

export const Footer = () => {
  return (
    <footer className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="institutional-divider" />

      <div className="grid gap-5 p-5 text-sm text-slate-600 dark:text-slate-300 md:grid-cols-[auto_1fr_auto] md:items-center md:p-6">
        <div className="flex items-center gap-3">
          <img
            src={ipnLogo}
            alt="Escudo del Instituto Politécnico Nacional"
            className="h-12 w-auto shrink-0"
          />
          <div>
            <h3 className="font-bold text-[#6F1D46] dark:text-pink-100">
              Instituto Politécnico Nacional
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              “La Técnica al Servicio de la Patria”
            </p>
          </div>
        </div>

        <div className="text-left md:text-center">
          <p className="font-semibold text-slate-700 dark:text-slate-200">
            Escuela Superior de Ingeniería Mecánica y Eléctrica
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Unidad Zacatenco · Portal NOTI ICE
          </p>
        </div>

        <p className="text-xs text-slate-400 md:text-right">
          © 2026 Portal de Comunicación Académica
        </p>
      </div>
    </footer>
  );
};
