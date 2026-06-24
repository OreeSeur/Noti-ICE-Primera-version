export const ROUTES = Object.freeze({
  HOME: "/",
  LOGIN: "/login",
  PERFIL: "/perfil",
  NOTIFICACIONES: "/notificaciones",
  DOCENTE_PUBLICACIONES: "/docente/publicaciones",
  AVISOS: "/avisos",
  AVISO_DETALLE: "/avisos/:id",
  EVENTOS: "/eventos",
  EVENTO_DETALLE: "/eventos/:id",
  CALENDARIO: "/calendario",
  DOCUMENTOS: "/documentos",
  DOCUMENTO_DETALLE: "/documentos/:id",
  ADMIN: "/admin",
  ADMIN_AVISOS: "/admin/avisos",
  ADMIN_AVISOS_NUEVO: "/admin/avisos/nuevo",
  ADMIN_AVISOS_EDITAR: "/admin/avisos/editar/:id",
  ADMIN_EVENTOS: "/admin/eventos",
  ADMIN_EVENTOS_NUEVO: "/admin/eventos/nuevo",
  ADMIN_EVENTOS_EDITAR: "/admin/eventos/editar/:id",
  ADMIN_DOCUMENTOS: "/admin/documentos",
  ADMIN_DOCUMENTOS_NUEVO: "/admin/documentos/nuevo",
  ADMIN_DOCUMENTOS_EDITAR: "/admin/documentos/editar/:id",
  ADMIN_USUARIOS: "/admin/usuarios",
  ADMIN_USUARIOS_NUEVO: "/admin/usuarios/nuevo",
  ADMIN_USUARIOS_EDITAR: "/admin/usuarios/editar/:id",
  ADMIN_ACADEMICO: "/admin/academico",
});

export const buildRoute = (route, params = {}) =>
  Object.entries(params).reduce(
    (path, [key, value]) => path.replace(`:${key}`, value),
    route
  );
