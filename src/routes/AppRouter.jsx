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
import { ROUTES } from "../constants/routes";

/* Error 404 */
import { NotFound } from "../pages/NotFound";

export const AppRouter = () => {
return ( <Routes>

  {/* Login */}
  <Route
    path={ROUTES.LOGIN}
    element={<Login />}
  />

  {/* Home */}
  <Route
    path={ROUTES.HOME}
    element={
      <Layout>
        <Home />
      </Layout>
    }
  />

  {/* Avisos */}
  <Route
    path={ROUTES.AVISOS}
    element={
      <Layout>
        <Avisos />
      </Layout>
    }
  />

  <Route
    path={ROUTES.AVISO_DETALLE}
    element={
      <Layout>
        <AvisoDetalle />
      </Layout>
    }
  />

  {/* Eventos */}
  <Route
    path={ROUTES.EVENTOS}
    element={
      <Layout>
        <Eventos />
      </Layout>
    }
  />

  <Route
    path={ROUTES.EVENTO_DETALLE}
    element={
      <Layout>
        <EventoDetalle />
      </Layout>
    }
  />

  {/* Calendario */}
  <Route
    path={ROUTES.CALENDARIO}
    element={
      <Layout>
        <Calendario />
      </Layout>
    }
  />

  {/* Documentos */}
  <Route
    path={ROUTES.DOCUMENTOS}
    element={
      <Layout>
        <Documentos />
      </Layout>
    }
  />

  <Route
    path={ROUTES.DOCUMENTO_DETALLE}
    element={
      <Layout>
        <DocumentoDetalle />
      </Layout>
    }
  />

  {/* Perfil */}
  <Route
    path={ROUTES.PERFIL}
    element={
      <PrivateRoute>
        <Layout>
          <Perfil />
        </Layout>
      </PrivateRoute>
    }
  />

{/* Administración */}
<Route
  path={ROUTES.ADMIN}
  element={
    <AdminRoute>
      <Layout>
        <PanelAdmin />
      </Layout>
    </AdminRoute>
  }
/>

<Route
  path={ROUTES.ADMIN_AVISOS}
  element={
    <AdminRoute>
      <Layout>
        <AdminAvisos />
      </Layout>
    </AdminRoute>
  }
/>

<Route
  path={ROUTES.ADMIN_AVISOS_NUEVO}
  element={
    <AdminRoute>
      <Layout>
        <AdminNuevoAviso />
      </Layout>
    </AdminRoute>
  }
/>

<Route
  path={ROUTES.ADMIN_AVISOS_EDITAR}
  element={
    <AdminRoute>
      <Layout>
        <AdminEditarAviso />
      </Layout>
    </AdminRoute>
  }
/>

<Route
  path={ROUTES.ADMIN_EVENTOS}
  element={
    <AdminRoute>
      <Layout>
        <AdminEventos />
      </Layout>
    </AdminRoute>
  }
/>

<Route
  path={ROUTES.ADMIN_EVENTOS_NUEVO}
  element={
    <AdminRoute>
      <Layout>
        <AdminNuevoEvento />
      </Layout>
    </AdminRoute>
  }
/>

<Route
  path={ROUTES.ADMIN_EVENTOS_EDITAR}
  element={
    <AdminRoute>
      <Layout>
        <AdminEditarEvento />
      </Layout>
    </AdminRoute>
  }
/>

<Route
  path={ROUTES.ADMIN_DOCUMENTOS}
  element={
    <AdminRoute>
      <Layout>
        <AdminDocumentos />
      </Layout>
    </AdminRoute>
  }
/>

<Route
  path={ROUTES.ADMIN_DOCUMENTOS_NUEVO}
  element={
    <AdminRoute>
      <Layout>
        <AdminNuevoDocumento />
      </Layout>
    </AdminRoute>
  }
/>

<Route
  path={ROUTES.ADMIN_DOCUMENTOS_EDITAR}
  element={
    <AdminRoute>
      <Layout>
        <AdminEditarDocumento />
      </Layout>
    </AdminRoute>
  }
/>
<Route
  path={ROUTES.ADMIN_USUARIOS}
  element={
    <AdminRoute>
      <Layout>
        <AdminUsuarios />
      </Layout>
    </AdminRoute>
  }
/>

<Route
  path={ROUTES.ADMIN_USUARIOS_NUEVO}
  element={
    <AdminRoute>
      <Layout>
        <AdminNuevoUsuario />
      </Layout>
    </AdminRoute>
  }
/>

<Route
  path={ROUTES.ADMIN_USUARIOS_EDITAR}
  element={
    <AdminRoute>
      <Layout>
        <AdminEditarUsuario />
      </Layout>
    </AdminRoute>
  }
/>
<Route
  path="*"
  element={
    <Layout>
      <NotFound />
    </Layout>
  }
/>
</Routes>



);
};
