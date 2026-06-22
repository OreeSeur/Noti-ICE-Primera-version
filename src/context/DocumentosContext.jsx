import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import {
  documentos as documentosIniciales,
} from "../data/documentos";

const DocumentosContext =
  createContext();

export const DocumentosProvider = ({
  children,
}) => {

  const [documentos, setDocumentos] =
    useState(() => {

      const guardados =
        localStorage.getItem(
          "documentos"
        );

      return guardados
        ? JSON.parse(guardados)
        : documentosIniciales;
    });

  useEffect(() => {
    localStorage.setItem(
      "documentos",
      JSON.stringify(documentos)
    );
  }, [documentos]);

  const agregarDocumento = (
    nuevoDocumento
  ) => {

    const documento = {
      id: Date.now(),
      ...nuevoDocumento,
    };

    setDocumentos((prev) => [
      documento,
      ...prev,
    ]);
  };

  const eliminarDocumento = (
    id
  ) => {

    setDocumentos((prev) =>
      prev.filter(
        (documento) =>
          documento.id !== id
      )
    );
  };

  const editarDocumento = (
    id,
    datosActualizados
  ) => {

    setDocumentos((prev) =>
      prev.map((documento) =>
        documento.id === Number(id)
          ? {
              ...documento,
              ...datosActualizados,
            }
          : documento
      )
    );
  };

  return (
    <DocumentosContext.Provider
      value={{
        documentos,
        agregarDocumento,
        eliminarDocumento,
        editarDocumento,
      }}
    >
      {children}
    </DocumentosContext.Provider>
  );
};

export const useDocumentos =
  () => useContext(
    DocumentosContext
  );