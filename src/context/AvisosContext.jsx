import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import { avisos as avisosIniciales } from "../data/avisos";

const AvisosContext = createContext();

export const AvisosProvider = ({
  children,
}) => {

  const [avisos, setAvisos] =
    useState(() => {

      const guardados =
        localStorage.getItem("avisos");

      return guardados
        ? JSON.parse(guardados)
        : avisosIniciales;
    });

  useEffect(() => {
    localStorage.setItem(
      "avisos",
      JSON.stringify(avisos)
    );
  }, [avisos]);

  const agregarAviso = (
    nuevoAviso
  ) => {

    const aviso = {
      id: Date.now(),
      ...nuevoAviso,
    };

    setAvisos((prev) => [
      aviso,
      ...prev,
    ]);
  };

  const eliminarAviso = (id) => {

    setAvisos((prev) =>
      prev.filter(
        (aviso) =>
          aviso.id !== id
      )
    );
  };

  const editarAviso = (
    id,
    datosActualizados
  ) => {

    setAvisos((prev) =>
      prev.map((aviso) =>
        aviso.id === Number(id)
          ? {
              ...aviso,
              ...datosActualizados,
            }
          : aviso
      )
    );
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

export const useAvisos = () =>
  useContext(AvisosContext);