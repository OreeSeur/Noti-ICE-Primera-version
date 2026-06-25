export class ApiError extends Error {
  constructor(message, status, details = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

export const getApiErrorMessage = (error) => {
  if (error instanceof ApiError) return error.message;
  if (error?.message) return error.message;
  return "Ocurrió un error inesperado al comunicarse con el servidor.";
};
