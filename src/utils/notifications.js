import { formatDateLabel, getDateTimestamp } from "./dates";
import { getDocumentTitle } from "./documentTypes";
import { canReceiveItem, getAudienceSummary, getItemAudience, getPriorityVariant } from "./audience";

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

export const buildNotificationItems = ({ avisos = [], eventos = [], documentos = [], user = null }) => {
  const avisoItems = avisos.filter((aviso) => canReceiveItem(aviso, user)).map((aviso) => {
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
      audiencia: getAudienceSummary(getItemAudience(aviso)),
      prioridadVariant: getPriorityVariant(getItemAudience(aviso).prioridad),
    };
  });

  const eventoItems = eventos.filter((evento) => canReceiveItem(evento, user)).map((evento) => {
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
      audiencia: getAudienceSummary(getItemAudience(evento)),
      prioridadVariant: getPriorityVariant(getItemAudience(evento).prioridad),
    };
  });

  const documentoItems = documentos.filter((documento) => canReceiveItem(documento, user)).map((documento) => {
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
      audiencia: getAudienceSummary(getItemAudience(documento)),
      prioridadVariant: getPriorityVariant(getItemAudience(documento).prioridad),
    };
  });

  return [...avisoItems, ...eventoItems, ...documentoItems]
    .filter((item) => item.id !== undefined && item.id !== null)
    .sort((a, b) => b.orden - a.orden);
};

export const mergeReadNotificationIds = (currentIds, notificationItems) => [
  ...new Set([...currentIds, ...notificationItems.map(getNotificationId)]),
];
