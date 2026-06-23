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

/* Autenticación */
import { Login } from "../pages/Login";
import { Perfil } from "../pages/Perfil";
import { PrivateRoute } from "./PrivateRoute";
import { AdminRoute } from "./AdminRoute";

/* Administración */
import { PanelAdmin } from "../pages/PanelAdmin";

import { AdminAvisos } from "../pages/AdminAvisos";
import { AdminNuevoAviso } from "../pages/AdminNuevoAviso";
import { AdminEditarAviso } from "../pages/AdminEditarAviso";

import { AdminEventos } from "../pages/AdminEventos";
import { AdminNuevoEvento } from "../pages/AdminNuevoEvento";
import { AdminEditarEvento } from "../pages/AdminEditarEvento";

import { AdminDocumentos } from "../pages/AdminDocumentos";
import { AdminNuevoDocumento } from "../pages/AdminNuevoDocumento";
import { AdminEditarDocumento } from "../pages/AdminEditarDocumento";

import { AdminUsuarios } from "../pages/AdminUsuarios";
import { AdminNuevoUsuario } from "../pages/AdminNuevoUsuario";
import { AdminEditarUsuario } from "../pages/AdminEditarUsuario";

/* Error 404 */
import { NotFound } from "../pages/NotFound";

export const AppRouter = () => {
return ( <Routes>

```
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
