import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  obtenerEventos,
  guardarEventos,
  agregarEventoLista,
  editarEventoLista,
  eliminarEventoLista,
} from "../services/eventosService";

const EventosContext = createContext();

export const EventosProvider = ({ children }) => {
  const [eventos, setEventos] = useState(() => obtenerEventos());

  useEffect(() => {
    guardarEventos(eventos);
  }, [eventos]);

  const agregarEvento = (nuevoEvento) => {
    setEventos((prev) => agregarEventoLista(prev, nuevoEvento));
  };

  const eliminarEvento = (id) => {
    setEventos((prev) => eliminarEventoLista(prev, id));
  };

  const editarEvento = (id, datosActualizados) => {
    setEventos((prev) => editarEventoLista(prev, id, datosActualizados));
  };

  return (
    <EventosContext.Provider
      value={{
        eventos,
        agregarEvento,
        eliminarEvento,
        editarEvento,
      }}
    >
      {children}
    </EventosContext.Provider>
  );
};

export const useEventos = () => useContext(EventosContext);
