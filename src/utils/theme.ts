export const applyThemePreference = (theme: string) => {
    const THEME_LIGHT = "light";
    const THEME_DARK = "dark";
    const root = window.document.documentElement;
    const isDark: boolean = theme === THEME_DARK;
    root.classList.remove(isDark ? THEME_LIGHT : THEME_DARK);
    root.classList.add(theme);
  };