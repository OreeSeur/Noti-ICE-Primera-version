import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";
import { UsuariosProvider } from "./context/UsuariosContext";
import { AvisosProvider } from "./context/AvisosContext";
import { EventosProvider } from "./context/EventosContext";
import { DocumentosProvider } from "./context/DocumentosContext";
import { ToastProvider } from "./context/ToastContext";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <UsuariosProvider>
      <AuthProvider>
        <AvisosProvider>
          <EventosProvider>
            <DocumentosProvider>
              <BrowserRouter>
                <ToastProvider>
                  <App />
                </ToastProvider>
              </BrowserRouter>
            </DocumentosProvider>
          </EventosProvider>
        </AvisosProvider>
      </AuthProvider>
    </UsuariosProvider>
  </React.StrictMode>
);