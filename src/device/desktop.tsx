import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { selectGetSession, selectIsAuth, useAuthStore } from "@/store/auth";
import { Chatbot } from "@/components/chatbot";
import { ChangeTheme } from "@/components/change-theme";
import { ViewExample } from "@/components/preview-example";
import { Logo } from "@/components/logo";
import ProtectedRoute from "@/router/protected";
import PrivateRoute from "@/router/private";
import DesktopSettings from "@/pages/settings/desktop-page";
import DesktopLandingPage from "@/pages/landing-page/desktop-page";
import DesktopProfile from "@/pages/profile/desktop-page";
import MobileProfile from "@/pages/profile/mobile-page";
import DesktopPublicUser from "@/pages/[username]/desktop-page";
import Verif from "@/pages/verification/page";
import EmailConfirm from "@/pages/email-confirm/page";

const Desktop = () => {
  const location = useLocation();
  const isAuth = useAuthStore(selectIsAuth);
  const getSession = useAuthStore(selectGetSession);

  useEffect(() => {
    getSession();
  }, [getSession]);

  return (
    <main className="grid grid-rows-1 grid-cols-3 place-self-center min-w-[1475px] w-full min-h-screen">
      {!location.pathname.includes("email-confirm") && (
        <section className="col-start-1 row-start-1 mt-8 ">
          <Logo />
          {isAuth ? <ChangeTheme /> : <ViewExample />}
        </section>
      )}
      <section className={`cols-start-2 row-start-1 ${!isAuth && "ml-14"}`}>
        <Routes>
          <Route path="/email-confirm" element={<EmailConfirm />} />
          <Route path="/:username" element={<DesktopPublicUser />} />
          <Route path="/verif/:id" element={<Verif />} />
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/" element={<DesktopLandingPage />} />
          </Route>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/profile" element={<DesktopProfile />} />
            <Route path="/profile" element={<MobileProfile />} />
            <Route path="/settings" element={<DesktopSettings />} />
          </Route>
        </Routes>
      </section>
      {!location.pathname.includes("email-confirm") && (
        <section className="col-start-3 row-start-1 mx-auto my-[15%]">
          <Chatbot />
        </section>
      )}
    </main>
  );
};

export default Desktop;
