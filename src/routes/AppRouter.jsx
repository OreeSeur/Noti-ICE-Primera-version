import { Routes, Route } from "react-router-dom";

import { Home } from "../pages/Home";

import { Avisos } from "../pages/Avisos";
import { AvisoDetalle } from "../pages/AvisoDetalle";

import { Eventos } from "../pages/Eventos";
import { EventoDetalle } from "../pages/EventoDetalle";

import { Calendario } from "../pages/Calendario";
import { Documentos } from "../pages/Documentos";
import { DocumentoDetalle } from "../pages/DocumentoDetalle";

import { Layout } from "../components/layout/Layout";

import { NotFound } from "../pages/NotFound";

export const AppRouter = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/avisos"
          element={<Avisos />}
        />

        <Route
          path="/avisos/:id"
          element={<AvisoDetalle />}
        />

        <Route
          path="/eventos"
          element={<Eventos />}
        />

        <Route
          path="/eventos/:id"
          element={<EventoDetalle />}
        />

        <Route
          path="/calendario"
          element={<Calendario />}
        />

        <Route
          path="/documentos"
          element={<Documentos />}
        />
        <Route
          path="/documentos/:id"
          element={<DocumentoDetalle />}
        />

        <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
    </Layout>
  );
};