import { selectGetSession, useAuthStore, selectSession } from "@/store/auth";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";

export default function ProtectedRoute() {
  const getSession = useAuthStore(selectGetSession);
  const session = useAuthStore(selectSession);
  useEffect(() => {
    getSession();
  }, [getSession]);
  if (!session) return <Outlet />;
  return <Navigate to="/profile" />;
}
