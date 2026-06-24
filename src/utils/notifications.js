import { formatDateLabel, getDateTimestamp } from "./dates";
import { getDocumentTitle } from "./documentTypes";

const READ_NOTIFICATIONS_KEY = "notiIce_read_notifications";

const getNotificationDate = (item) =>
  item.createdAt || item.updatedAt || item.fecha || item.fechaPublicacion || "";

export const getNotificationId = (item) => `${item.tipo}-${item.id}`;

export const getReadNotificationIds = () => {
  try {
    return JSON.parse(localStorage.getItem(READ_NOTIFICATIONS_KEY)) || [];
  } catch {
    return [];
  }
};

export const saveReadNotificationIds = (ids) => {
  localStorage.setItem(READ_NOTIFICATIONS_KEY, JSON.stringify(ids));
};

export const buildNotificationItems = ({ avisos = [], eventos = [], documentos = [] }) => {
  const avisoItems = avisos.map((aviso) => {
    const fechaNotificacion = getNotificationDate(aviso);

    return {
      id: aviso.id,
      titulo: aviso.titulo ?? "Aviso sin título",
      descripcion: aviso.descripcion ?? "",
      tipo: "aviso",
      etiqueta: "Aviso",
      fecha: fechaNotificacion,
      fechaLabel: formatDateLabel(fechaNotificacion),
      ruta: `/avisos/${aviso.id}`,
      orden: getDateTimestamp(fechaNotificacion),
    };
  });

  const eventoItems = eventos.map((evento) => {
    const fechaNotificacion = getNotificationDate(evento);

    return {
      id: evento.id,
      titulo: evento.titulo ?? "Evento sin título",
      descripcion: evento.lugar ?? evento.descripcion ?? "",
      tipo: "evento",
      etiqueta: "Evento",
      fecha: fechaNotificacion,
      fechaLabel: formatDateLabel(fechaNotificacion),
      ruta: `/eventos/${evento.id}`,
      orden: getDateTimestamp(fechaNotificacion),
    };
  });

  const documentoItems = documentos.map((documento) => {
    const fechaNotificacion = getNotificationDate(documento);

    return {
      id: documento.id,
      titulo: getDocumentTitle(documento),
      descripcion: documento.tipo ?? documento.descripcion ?? "",
      tipo: "documento",
      etiqueta: "Documento",
      fecha: fechaNotificacion,
      fechaLabel: formatDateLabel(fechaNotificacion),
      ruta: `/documentos/${documento.id}`,
      orden: getDateTimestamp(fechaNotificacion),
    };
  });

  return [...avisoItems, ...eventoItems, ...documentoItems]
    .filter((item) => item.id !== undefined && item.id !== null)
    .sort((a, b) => b.orden - a.orden);
};

export const mergeReadNotificationIds = (currentIds, notificationItems) => [
  ...new Set([...currentIds, ...notificationItems.map(getNotificationId)]),
];
