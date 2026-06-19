import { useState } from "react";

import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { Footer } from "./Footer";

export const Layout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <main
        className="
          flex-1
          bg-slate-100
          p-4
          md:p-8
        "
      >
        <Topbar
          setMobileOpen={setMobileOpen}
        />

        {children}

        <Footer />
      </main>
    </div>
  );
};