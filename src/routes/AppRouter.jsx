import { Routes, Route } from "react-router-dom";

import { Home } from "../pages/Home";
import { Avisos } from "../pages/Avisos";
import { Calendario } from "../pages/Calendario";
import { Documentos } from "../pages/Documentos";
import { Eventos } from "../pages/Eventos";

import { Layout } from "../components/layout/Layout";

export const AppRouter = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/avisos" element={<Avisos />} />
        <Route path="/calendario" element={<Calendario />} />
        <Route path="/documentos" element={<Documentos />} />
        <Route path="/eventos" element={<Eventos />} />
      </Routes>
    </Layout>
  );
};