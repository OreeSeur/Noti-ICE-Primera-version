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
    const usuarios =
      JSON.parse(
        localStorage.getItem(
          "usuarios"
        )
      ) || [];

    const usuario =
      usuarios.find(
        (item) =>
          item.correo === correo &&
          item.password ===
            password
      );

    if (!usuario) {
      return false;
    }

    setUser(usuario);

    return true;
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