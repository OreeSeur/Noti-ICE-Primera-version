import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export const AdminRoute = ({
  children,
}) => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (user.rol !== "admin") {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return children;
};