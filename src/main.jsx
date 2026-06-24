import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";

import { AuthProvider } from "./context/auth/AuthProvider";
import { UsuariosProvider } from "./context/usuarios/UsuariosProvider";
import { AvisosProvider } from "./context/avisos/AvisosProvider";
import { EventosProvider } from "./context/eventos/EventosProvider";
import { DocumentosProvider } from "./context/documentos/DocumentosProvider";
import { ToastProvider } from "./context/toast/ToastProvider";
import { AcademicoProvider } from "./context/academico/AcademicoProvider";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <UsuariosProvider>
      <AuthProvider>
        <AvisosProvider>
          <EventosProvider>
            <DocumentosProvider>
              <AcademicoProvider>
              <BrowserRouter>
                <ToastProvider>
                  <App />
                </ToastProvider>
              </BrowserRouter>
              </AcademicoProvider>
            </DocumentosProvider>
          </EventosProvider>
        </AvisosProvider>
      </AuthProvider>
    </UsuariosProvider>
  </React.StrictMode>
);