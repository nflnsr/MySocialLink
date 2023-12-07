import { Suspense, lazy, useEffect, useState } from "react";
const LoadingMobile = lazy(() => import("@/components/LoadingMobile"));
const LoadingDesktop = lazy(() => import("@/components/LoadingDesktop"));
const Desktop = lazy(() => timer(1300).then(() => import("@/device/desktop")));
const Mobile = lazy(() => timer(1300).then(() => import("@/device/mobile")));

function Index() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobileDevice = /mobile|android|ios|iphone|ipad|ipod|windows phone/i.test(userAgent);
    setIsMobile(isMobileDevice);
  }, []);

  return (
    <>
      {!isMobile && (
        <Suspense fallback={<LoadingDesktop />}>
          <div className="w-full h-screen">
            <Desktop />
          </div>
        </Suspense>
      )}
      {isMobile && (
        <Suspense fallback={<LoadingMobile />}>
          <div className="w-full h-[100svh]">
            <Mobile />
          </div>
        </Suspense>
      )}
    </>
  );
}

function timer(time: number | undefined) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

export default Index;
