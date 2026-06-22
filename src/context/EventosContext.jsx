import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import { eventos as eventosIniciales } from "../data/eventos";

const EventosContext = createContext();

export const EventosProvider = ({
  children,
}) => {

  const [eventos, setEventos] =
    useState(() => {

      const guardados =
        localStorage.getItem("eventos");

      return guardados
        ? JSON.parse(guardados)
        : eventosIniciales;
    });

  useEffect(() => {
    localStorage.setItem(
      "eventos",
      JSON.stringify(eventos)
    );
  }, [eventos]);

  const agregarEvento = (
    nuevoEvento
  ) => {

    const evento = {
      id: Date.now(),
      ...nuevoEvento,
    };

    setEventos((prev) => [
      evento,
      ...prev,
    ]);
  };

  const eliminarEvento = (id) => {

    setEventos((prev) =>
      prev.filter(
        (evento) =>
          evento.id !== id
      )
    );
  };

  const editarEvento = (
    id,
    datosActualizados
  ) => {

    setEventos((prev) =>
      prev.map((evento) =>
        evento.id === Number(id)
          ? {
              ...evento,
              ...datosActualizados,
            }
          : evento
      )
    );
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

export const useEventos = () =>
  useContext(EventosContext);