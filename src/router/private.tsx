import { selectGetSession, selectIsAuth, useAuthStore } from "@/store/auth";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function PrivateRoute() {
  const getSession = useAuthStore(selectGetSession);
  const auth = useAuthStore(selectIsAuth);
  const navigate = useNavigate();
  useEffect(() => {
    getSession();
  }, [getSession]);
  if (auth) return <Outlet />;
  navigate("/")
}
