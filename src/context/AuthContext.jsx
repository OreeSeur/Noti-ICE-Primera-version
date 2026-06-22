import {
  createContext,
  useContext,
  useState,
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({
  children,
}) => {
  const [user, setUser] =
    useState(null);
    console.log(
      "AUTH PROVIDER USER:",
      user);
  const login = (
    correo,
    password
  ) => {
    console.log(
      "INTENTANDO LOGIN:",
      correo
    );

    if (
      correo === "admin@esime.mx" &&
      password === "123456"
    ) {
      const admin = {
        nombre: "Administrador",
        correo,
        rol: "admin",
      };

      console.log(
        "LOGIN ADMIN:",
        admin
      );

      setUser(admin);

      return true;
    }

    if (
      correo === "usuario@esime.mx" &&
      password === "123456"
    ) {
      const alumno = {
        nombre: "Alumno",
        correo,
        rol: "usuario",
      };

      console.log(
        "LOGIN USUARIO:",
        alumno
      );

      setUser(alumno);

      return true;
    }

    console.log(
      "LOGIN FALLIDO"
    );

    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);