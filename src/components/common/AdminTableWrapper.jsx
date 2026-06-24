export const AdminTableWrapper = ({ children }) => {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-md dark:bg-slate-800">
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
};
