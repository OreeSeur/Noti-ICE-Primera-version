import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main
        className="
          flex-1
          bg-slate-100
          p-8
        "
      >
        <Topbar />

        {children}
      </main>
    </div>
  );
};