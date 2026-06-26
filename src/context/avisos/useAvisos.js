import { useContext } from "react";
import { AvisosContext } from "./AvisosContext";

export const useAvisos = () => {
  const context = useContext(AvisosContext);

  if (!context) {
    throw new Error("useAvisos debe usarse dentro de AvisosProvider");
  }

  return context;
};
