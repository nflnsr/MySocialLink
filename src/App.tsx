import Index from "@/router"
import { useEffect } from "react";
import { useTheme } from "@/store/theme";
import { applyThemePreference } from "@/utils/theme";
import { initDatadogRum } from '@/lib/datadog-rum';

export default function App() {
  const theme = useTheme();
  
  useEffect(() => {
    applyThemePreference(theme);
  }, [theme]);

  useEffect(() => {
    initDatadogRum();
  }, []);

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
    });
  }

  return (
    <Index />
  )
}
