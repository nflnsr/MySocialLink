import { supabase } from "@/lib/supabase-client";
import { Session } from "@supabase/supabase-js";
import { create } from "zustand";

type Auth = {
  session: Session | null;
  isAuth: boolean;
  getSession: () => Promise<void>;
};

export const useAuthStore = create<Auth>((set) => ({
  session: null,
  isAuth: false,
  getSession: async () => {
    set({ isAuth: true });
    await supabase.auth.getSession().then(({ data: { session } }) => {
      set({ session: session });
    });
    supabase.auth.onAuthStateChange((_event, newSession) => {
      set({ session: newSession });
      if (newSession) {
        set({ isAuth: true });
      } else {
        set({ isAuth: false });
      }
    });
  },
}));

export const selectSession = (state: { session: Session | null }) => state.session;
export const selectIsAuth = (state: { isAuth: boolean }) => state.isAuth;
export const selectGetSession = (state: { getSession: () => Promise<void> }) => state.getSession;
