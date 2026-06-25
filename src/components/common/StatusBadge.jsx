const variantClasses = {
  default: "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200",
  primary: "bg-[#6F1D46]/10 text-[#6F1D46] dark:bg-[#6F1D46]/30 dark:text-pink-100",
  success: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-200",
  warning: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-200",
  info: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200",
  danger: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-200",
};

export const StatusBadge = ({ label, variant = "default", className = "" }) => {
  return (
    <span
      className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-sm font-medium ${
        variantClasses[variant] || variantClasses.default
      } ${className}`}
    >
      {label}
    </span>
  );
};
