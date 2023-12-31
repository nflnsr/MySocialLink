import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = {
    theme: string;
    setTheme: () => void;
};

const useThemeStore = create(persist<Theme>(
    (set, get) => ({
        theme: "dark",
        setTheme: () => set((state) => ({
            ...state,
            theme: get().theme === "dark" ? "light" : "dark"
        })),
    }), {
        name: 'theme',
    }
));

export const useTheme = () => useThemeStore((state) => state.theme);
export const useSetTheme = () => useThemeStore((state) => state.setTheme);