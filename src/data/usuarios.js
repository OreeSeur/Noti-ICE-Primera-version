import { ROLES } from "../constants/roles";

export const usuarios = [
  {
    id: 1,
    nombre: "Administrador",
    correo: "admin@esime.mx",
    password: "admin",
    rol: ROLES.ADMIN,
    boleta: "ADMIN-001",
    carrera: "Administración del Portal",
    semestre: "N/A",
  },
  {
    id: 2,
    nombre: "Alumno",
    correo: "usuario@esime.mx",
    password: "123456",
    rol: ROLES.ALUMNO,
    boleta: "2023630000",
    carrera: "Ingeniería en Computación",
    semestre: "6° Semestre",
  },
];