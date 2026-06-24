const READ_NOTIFICATIONS_KEY = "notiIce_read_notifications";

const normalizeDateValue = (value) => {
  const timestamp = Date.parse(value ?? "");
  return Number.isNaN(timestamp) ? 0 : timestamp;
};

const formatDateLabel = (value) => {
  const timestamp = normalizeDateValue(value);

  if (!timestamp) {
    return "";
  }

  return new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(timestamp));
};

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
  const avisoItems = avisos.map((aviso) => ({
    id: aviso.id,
    titulo: aviso.titulo ?? "Aviso sin título",
    descripcion: aviso.descripcion ?? "",
    tipo: "aviso",
    etiqueta: "Aviso",
    fecha: aviso.createdAt ?? aviso.fecha ?? "",
    fechaLabel: formatDateLabel(aviso.createdAt ?? aviso.fecha),
    ruta: `/avisos/${aviso.id}`,
  }));

  const eventoItems = eventos.map((evento) => ({
    id: evento.id,
    titulo: evento.titulo ?? "Evento sin título",
    descripcion: evento.lugar ?? evento.descripcion ?? "",
    tipo: "evento",
    etiqueta: "Evento",
    fecha: evento.createdAt ?? evento.fecha ?? "",
    fechaLabel: formatDateLabel(evento.createdAt ?? evento.fecha),
    ruta: `/eventos/${evento.id}`,
  }));

  const documentoItems = documentos.map((documento) => ({
    id: documento.id,
    titulo: documento.titulo ?? documento.nombre ?? "Documento sin título",
    descripcion: documento.tipo ?? documento.descripcion ?? "",
    tipo: "documento",
    etiqueta: "Documento",
    fecha: documento.createdAt ?? documento.fecha ?? "",
    fechaLabel: formatDateLabel(documento.createdAt ?? documento.fecha),
    ruta: `/documentos/${documento.id}`,
  }));

  return [...avisoItems, ...eventoItems, ...documentoItems]
    .filter((item) => item.id !== undefined && item.id !== null)
    .sort((a, b) => normalizeDateValue(b.fecha) - normalizeDateValue(a.fecha));
};

export const mergeReadNotificationIds = (currentIds, notificationItems) => [
  ...new Set([...currentIds, ...notificationItems.map(getNotificationId)]),
];
