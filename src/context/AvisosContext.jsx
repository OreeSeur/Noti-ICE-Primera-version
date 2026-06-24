import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  obtenerAvisos,
  guardarAvisos,
  agregarAvisoLista,
  editarAvisoLista,
  eliminarAvisoLista,
} from "../services/avisosService";

const AvisosContext = createContext();

export const AvisosProvider = ({ children }) => {
  const [avisos, setAvisos] = useState(() => obtenerAvisos());

  useEffect(() => {
    guardarAvisos(avisos);
  }, [avisos]);

  const agregarAviso = (nuevoAviso) => {
    setAvisos((prev) => agregarAvisoLista(prev, nuevoAviso));
  };

  const eliminarAviso = (id) => {
    setAvisos((prev) => eliminarAvisoLista(prev, id));
  };

  const editarAviso = (id, datosActualizados) => {
    setAvisos((prev) => editarAvisoLista(prev, id, datosActualizados));
  };

  return (
    <AvisosContext.Provider
      value={{
        avisos,
        agregarAviso,
        eliminarAviso,
        editarAviso,
      }}
    >
      {children}
    </AvisosContext.Provider>
  );
};

export const useAvisos = () => useContext(AvisosContext);
