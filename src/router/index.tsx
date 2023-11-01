import DesktopSettings from "@/pages/settings/desktop-page";
import MobileSettings from "@/pages/settings/mobile-page";
import DesktopLandingPage from "@/pages/landing-page/desktop-page";
import MobileLandingPage from "@/pages/landing-page/mobile-page";
import Verif from "@/pages/verification/page";
import EmailConfirm from "@/pages/email-confirm/page";
import PrivateRoute from "./private";
import ProtectedRoute from "./protected";
import DesktopProfile from "@/pages/profile/desktop-page";
import MobileProfile from "@/pages/profile/mobile-page";
import DesktopPublicUser from "@/pages/[username]/desktop-page";
import MobilePublicUser from "@/pages/[username]/mobile-page";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { selectGetSession, selectIsAuth, useAuthStore } from "@/store/auth";
import { Chatbot } from "@/components/chatbot";
import { ChangeTheme } from "@/components/change-theme";
import { ViewExample } from "@/components/preview-example";
import { Logo } from "@/components/logo";

function Index() {
  const isAuth = useAuthStore(selectIsAuth);
  const session = useAuthStore(selectGetSession);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobileDevice = /mobile|android|ios|iphone|ipad|ipod|windows phone/i.test(userAgent);
    setIsMobile(isMobileDevice);
    session();
  }, []);

  return (
    <>
      {!isMobile ? (
        <main className="grid grid-rows-1 grid-cols-3 place-self-center min-w-[1475px] w-full min-h-screen">
          <section className="col-start-1 row-start-1 mt-8 ">
            <Logo />
            {isAuth ? <ChangeTheme /> : <ViewExample />}
          </section>
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
          <section className="col-start-3 row-start-1 mx-auto my-[15%]">
            <Chatbot />
          </section>
        </main>
      ) : (
        <main className="">
          <Routes>
            <Route path="/email-confirm" element={<EmailConfirm />} />
            <Route path="/:username" element={<MobilePublicUser />} />
            <Route path="/verif/:id" element={<Verif />} />
            <Route path="/" element={<ProtectedRoute />}>
              <Route path="/" element={<MobileLandingPage />} />
            </Route>
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/profile" element={<MobileProfile />} />
              <Route path="/settings" element={<MobileSettings />} />
            </Route>
          </Routes>
        </main>
      )}
    </>
  );
}

export default Index;
