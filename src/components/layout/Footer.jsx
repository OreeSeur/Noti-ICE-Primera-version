export const Footer = () => {
  return (
    <footer
      className="
        mt-12
        bg-white
        rounded-xl
        shadow-md
        p-6
        text-center
      "
    >
      <h3
        className="
          font-bold
          text-[#6A0032]
          text-lg
        "
      >
        Instituto Politécnico Nacional
      </h3>

      <p className="text-slate-600">
        ESIME Unidad Zacatenco
      </p>

      <p
        className="
          text-sm
          text-slate-500
          mt-2
        "
      >
        Portal Académico 2026
      </p>

      <p
        className="
          text-xs
          text-slate-400
          mt-1
        "
      >
        Desarrollado con React y Tailwind CSS
      </p>
    </footer>
  );
};