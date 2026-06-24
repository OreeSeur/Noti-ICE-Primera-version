import { crearId, mismoId } from "../utils/id";
import {
  obtenerDocumentosStorage,
  guardarDocumentosStorage,
} from "../storage/documentosStorage";

export const obtenerDocumentos = () => obtenerDocumentosStorage();

export const guardarDocumentos = (documentos) =>
  guardarDocumentosStorage(documentos);

export const crearDocumento = (nuevoDocumento) => ({
  ...nuevoDocumento,
  id: crearId(),
  createdAt: new Date().toISOString(),
});

export const agregarDocumentoLista = (documentos, nuevoDocumento) => [
  crearDocumento(nuevoDocumento),
  ...documentos,
];

export const editarDocumentoLista = (documentos, id, datosActualizados) =>
  documentos.map((documento) =>
    mismoId(documento.id, id)
      ? {
          ...documento,
          ...datosActualizados,
          updatedAt: new Date().toISOString(),
        }
      : documento
  );

export const eliminarDocumentoLista = (documentos, id) =>
  documentos.filter((documento) => !mismoId(documento.id, id));
