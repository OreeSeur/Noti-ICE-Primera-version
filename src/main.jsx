import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { AvisosProvider } from "./context/AvisosContext";
import { EventosProvider } from "./context/EventosContext";


ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <AuthProvider>
      <AvisosProvider>
        <EventosProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </EventosProvider>
      </AvisosProvider>
    </AuthProvider>
  </React.StrictMode>
);