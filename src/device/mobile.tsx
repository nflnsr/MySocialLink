import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/router/protected";
import PrivateRoute from "@/router/private";
import MobileProfile from "@/pages/profile/mobile-page";
import Verif from "@/pages/verification/page";
import EmailConfirm from "@/pages/email-confirm/page";
import MobileSettings from "@/pages/settings/mobile-page";
import MobileLandingPage from "@/pages/landing-page/mobile-page";
import MobilePublicUser from "@/pages/[username]/mobile-page";

const Mobile = () => {
  return (
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
  );
};

export default Mobile;
