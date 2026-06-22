import { Routes, Route } from "react-router-dom";

/* Layout principal */
import { Layout } from "../components/layout/Layout";

/* Páginas públicas */
import { Home } from "../pages/Home";

import { Avisos } from "../pages/Avisos";
import { AvisoDetalle } from "../pages/AvisoDetalle";

import { Eventos } from "../pages/Eventos";
import { EventoDetalle } from "../pages/EventoDetalle";

import { Calendario } from "../pages/Calendario";

import { Documentos } from "../pages/Documentos";
import { DocumentoDetalle } from "../pages/DocumentoDetalle";

import { NuevoAviso } from "../pages/NuevoAviso";
import { AdminAvisos } from "../pages/AdminAvisos";

/* Autenticación */
import { Login } from "../pages/Login";
import { Perfil } from "../pages/Perfil";
import { PanelAdmin } from "../pages/PanelAdmin";

/* Error 404 */
import { NotFound } from "../pages/NotFound";

export const AppRouter = () => {
  return (
    <Routes>

      {/* ==========================
          RUTAS SIN LAYOUT
      ========================== */}

      <Route
        path="/login"
        element={<Login />}
      />

      {/* ==========================
          RUTAS CON LAYOUT
      ========================== */}

      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />

      <Route
        path="/avisos"
        element={
          <Layout>
            <Avisos />
          </Layout>
        }
      />

      <Route
        path="/avisos/:id"
        element={
          <Layout>
            <AvisoDetalle />
          </Layout>
        }
      />

      <Route
        path="/eventos"
        element={
          <Layout>
            <Eventos />
          </Layout>
        }
      />

      <Route
        path="/eventos/:id"
        element={
          <Layout>
            <EventoDetalle />
          </Layout>
        }
      />

      <Route
        path="/calendario"
        element={
          <Layout>
            <Calendario />
          </Layout>
        }
      />

      <Route
        path="/documentos"
        element={
          <Layout>
            <Documentos />
          </Layout>
        }
      />

      <Route
        path="/documentos/:id"
        element={
          <Layout>
            <DocumentoDetalle />
          </Layout>
        }
      />

      <Route
        path="/perfil"
        element={
          <Layout>
            <Perfil />
          </Layout>
        }
      />
      
      <Route
        path="/admin"
        element={
          <Layout>
            <PanelAdmin />
          </Layout>
        }
      />
      
      <Route
        path="/admin/avisos"
        element={
          <Layout>
            <AdminAvisos />
          </Layout>
        }
      />

      <Route
        path="/admin/avisos/nuevo"
        element={
          <Layout>
            <NuevoAviso />
          </Layout>
        }
      />

      {/* ==========================
          PÁGINA NO ENCONTRADA
      ========================== */}

      <Route
        path="*"
        element={<NotFound />}
      />



    </Routes>
  );
};