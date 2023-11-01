import { selectGetSession, selectIsAuth, useAuthStore } from "@/store/auth";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function PrivateRoute() {
  const auth = useAuthStore(selectGetSession);
  const token = useAuthStore(selectIsAuth);
  const navigate = useNavigate();
  useEffect(() => {
    auth();
  }, [auth]);
  if (!token) {
    navigate("/");
  } else if (token) {
    return <Outlet />;
  }
}
