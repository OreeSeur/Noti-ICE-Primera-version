import { SUBSCRIPTION_TOPICS, normalizeSubscriptions } from "../constants/subscriptions";
import { getDocumentTitle } from "./documentTypes";

const normalizeText = (value = "") =>
  String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const getTopicKeywords = (topicValue) =>
  SUBSCRIPTION_TOPICS.find((topic) => topic.value === topicValue)?.keywords || [];

const itemText = (item, type) => {
  const title = type === "documento" ? getDocumentTitle(item) : item.titulo;

  return normalizeText(
    [
      title,
      item.descripcion,
      item.categoria,
      item.tipo,
      item.lugar,
      type,
    ]
      .filter(Boolean)
      .join(" ")
  );
};

const matchesTopic = (item, type, topicValue) => {
  const text = itemText(item, type);

  return getTopicKeywords(topicValue).some((keyword) =>
    text.includes(normalizeText(keyword))
  );
};

export const isRelevantForUser = (item, type, user) => {
  if (!user) return false;

  const subscriptions = normalizeSubscriptions(user.subscriptions);

  if (type === "aviso" && !subscriptions.notifyAvisos) return false;
  if (type === "evento" && !subscriptions.notifyEventos) return false;
  if (type === "documento" && !subscriptions.notifyDocumentos) return false;

  return subscriptions.topics.some((topic) => matchesTopic(item, type, topic));
};

const buildRecommendation = (item, type, label, path) => ({
  id: `${type}-${item.id}`,
  sourceId: item.id,
  type,
  label,
  title: type === "documento" ? getDocumentTitle(item) : item.titulo,
  description: item.descripcion || item.lugar || item.tipo || "Sin descripción disponible",
  date: item.fecha || item.createdAt || item.updatedAt || "Sin fecha",
  path,
});

export const getPersonalizedRecommendations = ({
  avisos = [],
  eventos = [],
  documentos = [],
  user,
  limit = 6,
}) => {
  if (!user) return [];

  const items = [
    ...avisos
      .filter((aviso) => isRelevantForUser(aviso, "aviso", user))
      .map((aviso) => buildRecommendation(aviso, "aviso", "Aviso", `/avisos/${aviso.id}`)),
    ...eventos
      .filter((evento) => isRelevantForUser(evento, "evento", user))
      .map((evento) => buildRecommendation(evento, "evento", "Evento", `/eventos/${evento.id}`)),
    ...documentos
      .filter((documento) => isRelevantForUser(documento, "documento", user))
      .map((documento) =>
        buildRecommendation(documento, "documento", "Documento", `/documentos/${documento.id}`)
      ),
  ];

  return items
    .sort((a, b) => String(b.date).localeCompare(String(a.date)))
    .slice(0, limit);
};
