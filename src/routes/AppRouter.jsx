import { Routes, Route } from "react-router-dom";

/* Layout principal */
import { Layout } from "../components/layout/Layout";

/* Páginas públicas */
import { Home } from "../pages/public/Home";

import { Avisos } from "../pages/public/Avisos";
import { AvisoDetalle } from "../pages/public/AvisoDetalle";

import { Eventos } from "../pages/public/Eventos";
import { EventoDetalle } from "../pages/public/EventoDetalle";

import { Calendario } from "../pages/public/Calendario";

import { Documentos } from "../pages/public/Documentos";
import { DocumentoDetalle } from "../pages/public/DocumentoDetalle";

import { Perfil } from "../pages/public/Perfil";

/* Autenticación */
import { Login } from "../pages/auth/Login";

/* Administración */
import { PanelAdmin } from "../pages/PanelAdmin";

import { AdminAvisos } from "../pages/admin/avisos/AdminAvisos";
import { AdminNuevoAviso } from "../pages/admin/avisos/AdminNuevoAviso";
import { AdminEditarAviso } from "../pages/admin/avisos/AdminEditarAviso";

import { AdminEventos } from "../pages/admin/eventos/AdminEventos";
import { AdminNuevoEvento } from "../pages/admin/eventos/AdminNuevoEvento";
import { AdminEditarEvento } from "../pages/admin/eventos/AdminEditarEvento";

import { AdminDocumentos } from "../pages/admin/documentos/AdminDocumentos";
import { AdminNuevoDocumento } from "../pages/admin/documentos/AdminNuevoDocumento";
import { AdminEditarDocumento } from "../pages/admin/documentos/AdminEditarDocumento";

import { AdminUsuarios } from "../pages/admin/usuarios/AdminUsuarios";
import { AdminNuevoUsuario } from "../pages/admin/usuarios/AdminNuevoUsuario";
import { AdminEditarUsuario } from "../pages/admin/usuarios/AdminEditarUsuario";

/* Rutas protegidas */
import { PrivateRoute } from "./PrivateRoute";
import { AdminRoute } from "./AdminRoute";

/* Error 404 */
import { NotFound } from "../pages/NotFound";

export const AppRouter = () => {
return ( <Routes>

  {/* Login */}
  <Route
    path="/login"
    element={<Login />}
  />

  {/* Home */}
  <Route
    path="/"
    element={
      <Layout>
        <Home />
      </Layout>
    }
  />

  {/* Avisos */}
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

  {/* Eventos */}
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

  {/* Calendario */}
  <Route
    path="/calendario"
    element={
      <Layout>
        <Calendario />
      </Layout>
    }
  />

  {/* Documentos */}
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

  {/* Perfil */}
  <Route
    path="/perfil"
    element={
      <Layout>
        <Perfil />
      </Layout>
    }
  />

{/* Administración */}
<Route
  path="/admin"
  element={
    <AdminRoute>
      <Layout>
        <PanelAdmin />
      </Layout>
    </AdminRoute>
  }
/>

<Route
  path="/admin/avisos"
  element={
    <AdminRoute>
      <Layout>
        <AdminAvisos />
      </Layout>
    </AdminRoute>
  }
/>

<Route
  path="/admin/avisos/nuevo"
  element={
    <AdminRoute>
      <Layout>
        <AdminNuevoAviso />
      </Layout>
    </AdminRoute>
  }
/>

<Route
  path="/admin/avisos/editar/:id"
  element={
    <AdminRoute>
      <Layout>
        <AdminEditarAviso />
      </Layout>
    </AdminRoute>
  }
/>

<Route
  path="/admin/eventos"
  element={
    <AdminRoute>
      <Layout>
        <AdminEventos />
      </Layout>
    </AdminRoute>
  }
/>

<Route
  path="/admin/eventos/nuevo"
  element={
    <AdminRoute>
      <Layout>
        <AdminNuevoEvento />
      </Layout>
    </AdminRoute>
  }
/>

<Route
  path="/admin/eventos/editar/:id"
  element={
    <AdminRoute>
      <Layout>
        <AdminEditarEvento />
      </Layout>
    </AdminRoute>
  }
/>

<Route
  path="/admin/documentos"
  element={
    <AdminRoute>
      <Layout>
        <AdminDocumentos />
      </Layout>
    </AdminRoute>
  }
/>

<Route
  path="/admin/documentos/nuevo"
  element={
    <AdminRoute>
      <Layout>
        <AdminNuevoDocumento />
      </Layout>
    </AdminRoute>
  }
/>

<Route
  path="/admin/documentos/editar/:id"
  element={
    <AdminRoute>
      <Layout>
        <AdminEditarDocumento />
      </Layout>
    </AdminRoute>
  }
/>
<Route
  path="/admin/usuarios"
  element={
    <AdminRoute>
      <Layout>
        <AdminUsuarios />
      </Layout>
    </AdminRoute>
  }
/>

<Route
  path="/admin/usuarios/nuevo"
  element={
    <AdminRoute>
      <Layout>
        <AdminNuevoUsuario />
      </Layout>
    </AdminRoute>
  }
/>

<Route
  path="/admin/usuarios/editar/:id"
  element={
    <AdminRoute>
      <Layout>
        <AdminEditarUsuario />
      </Layout>
    </AdminRoute>
  }
/>
</Routes>



);
};
