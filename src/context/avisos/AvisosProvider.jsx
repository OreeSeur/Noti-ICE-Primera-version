import { useCallback, useEffect, useMemo, useState } from "react";

import {
  obtenerAvisos,
  guardarAvisos,
  agregarAvisoLista,
  editarAvisoLista,
  eliminarAvisoLista,
} from "../../services/avisosService";
import { AvisosContext } from "./AvisosContext";

export const AvisosProvider = ({ children }) => {
  const [avisos, setAvisos] = useState(() => obtenerAvisos());

  useEffect(() => {
    guardarAvisos(avisos);
  }, [avisos]);

  const agregarAviso = useCallback((nuevoAviso) => {
    setAvisos((prev) => agregarAvisoLista(prev, nuevoAviso));
  }, []);

  const eliminarAviso = useCallback((id) => {
    setAvisos((prev) => eliminarAvisoLista(prev, id));
  }, []);

  const editarAviso = useCallback((id, datosActualizados) => {
    setAvisos((prev) => editarAvisoLista(prev, id, datosActualizados));
  }, []);

  const value = useMemo(
    () => ({
      avisos,
      agregarAviso,
      eliminarAviso,
      editarAviso,
    }),
    [avisos, agregarAviso, eliminarAviso, editarAviso]
  );

  return (
    <AvisosContext.Provider value={value}>
      {children}
    </AvisosContext.Provider>
  );
};
