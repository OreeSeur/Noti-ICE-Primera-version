import { Navigate } from "react-router-dom";

import { useAuth } from "../context/auth/useAuth";
import { ROUTES } from "../constants/routes";
import { canAccessAdmin } from "../utils/permissions";

export const AdminRoute = ({
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

  if (!canAccessAdmin(user)) {
    return (
      <Navigate
        to={ROUTES.HOME}
        replace
      />
    );
  }

  return children;
};
