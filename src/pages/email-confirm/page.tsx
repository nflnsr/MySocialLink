import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Page() {
  const [timer, setTimer] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.hash.includes("access_token")) {
      setTimer(6);
    } else if (!location.hash.includes("access_token") && timer === 0) {
      navigate("/");
    }
    const timeout = setInterval(() => {
      if (timer > 0) {
        setTimer((prev) => prev - 1);
      } else if (timer === 0) {
        clearInterval(timeout);
        window.close();
      }
    }, 1000);
    return () => clearInterval(timeout);
  }, [location.hash, navigate, timer]);

  useEffect(() => {
    document.title = "MySocialLink - Email Confirm";
  }, []);

  return (
    <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2">
      email confirmed, you can close this page {timer}
    </div>
  );
}
