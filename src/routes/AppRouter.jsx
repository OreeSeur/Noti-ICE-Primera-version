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
      <AdminNuevoAviso />
    </Layout>
  }
/>

<Route
  path="/admin/avisos/editar/:id"
  element={
    <Layout>
      <AdminEditarAviso />
    </Layout>
  }
/>

<Route
  path="/admin/eventos"
  element={
    <Layout>
      <AdminEventos />
    </Layout>
  }
/>

<Route
  path="/admin/eventos/nuevo"
  element={
    <Layout>
      <AdminNuevoEvento />
    </Layout>
  }
/>

<Route
  path="/admin/eventos/editar/:id"
  element={
    <Layout>
      <AdminEditarEvento />
    </Layout>
  }
/>

<Route
  path="/admin/documentos"
  element={
    <Layout>
      <AdminDocumentos />
    </Layout>
  }
/>

<Route
  path="/admin/documentos/nuevo"
  element={
    <Layout>
      <AdminNuevoDocumento />
    </Layout>
  }
/>

<Route
  path="/admin/documentos/editar/:id"
  element={
    <Layout>
      <AdminEditarDocumento />
    </Layout>
  }
/>
</Routes>



);
};
