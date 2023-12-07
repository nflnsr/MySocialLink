import Index from "@/router"
import { useEffect } from "react";
import { useTheme } from "@/store/theme";
import { applyThemePreference } from "@/utils/theme";

export default function App() {
  const theme = useTheme();
  useEffect(() => {
    applyThemePreference(theme);
  }, [theme]);

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
    });
  }

  return (
    <Index />
  )
}
