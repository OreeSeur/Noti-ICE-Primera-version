import { Navigate } from "react-router-dom";

import { useAuth } from "../context/auth/useAuth";
import { ROUTES } from "../constants/routes";

export const PrivateRoute = ({
  children,
}) => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Navigate
        to={ROUTES.LOGIN}
        replace
      />
    );
  }

  return children;
};
