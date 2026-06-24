import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  obtenerDocumentos,
  guardarDocumentos,
  agregarDocumentoLista,
  editarDocumentoLista,
  eliminarDocumentoLista,
} from "../services/documentosService";

const DocumentosContext = createContext();

export const DocumentosProvider = ({ children }) => {
  const [documentos, setDocumentos] = useState(() => obtenerDocumentos());

  useEffect(() => {
    guardarDocumentos(documentos);
  }, [documentos]);

  const agregarDocumento = (nuevoDocumento) => {
    setDocumentos((prev) => agregarDocumentoLista(prev, nuevoDocumento));
  };

  const eliminarDocumento = (id) => {
    setDocumentos((prev) => eliminarDocumentoLista(prev, id));
  };

  const editarDocumento = (id, datosActualizados) => {
    setDocumentos((prev) => editarDocumentoLista(prev, id, datosActualizados));
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

export const useDocumentos = () => useContext(DocumentosContext);
