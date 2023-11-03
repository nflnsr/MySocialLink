import Index from "@/router"
import { useEffect } from "react";
import { useTheme } from "@/store/theme";
import { applyThemePreference } from "@/utils/theme";

export default function App() {
  const theme = useTheme();
  useEffect(() => {
    applyThemePreference(theme);
  }, [theme]);

  return (
    <Index />
  )
}
