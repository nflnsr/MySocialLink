import { selectGetSession, selectIsAuth, useAuthStore } from "@/store/auth";
import { Outlet, Navigate } from "react-router-dom";
import { useEffect } from "react";

export default function PrivateRoute() {
  const getSession = useAuthStore(selectGetSession);
  const auth = useAuthStore(selectIsAuth);
  useEffect(() => {
    getSession();
  }, [getSession]);
  if (auth === true) return <Outlet />;
  return <Navigate to="/" />;
}
