import Index from "@/router"
import { useEffect } from "react";
import { useTheme } from "@/store/theme";
import { applyThemePreference } from "@/utils/theme";

export default function App() {
  const themee = useTheme();
  useEffect(() => {
    applyThemePreference(themee);
  }, [themee]);

  return (
    <Index />
  )
}
