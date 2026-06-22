import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({
  children,
}) => {
  const [user, setUser] =
    useState(() => {
      const guardado =
        localStorage.getItem("user");

      return guardado
        ? JSON.parse(guardado)
        : null;
    });

  useEffect(() => {
    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );
  }, [user]);

  const login = (
    correo,
    password
  ) => {
    if (
      correo === "admin@esime.mx" &&
      password === "123456"
    ) {
      const admin = {
        nombre: "Administrador",
        correo,
        rol: "admin",
      };

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

      setUser(alumno);

      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);

    localStorage.removeItem(
      "user"
    );
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