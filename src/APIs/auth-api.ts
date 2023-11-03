import { supabase } from "@/lib/supabase-client";

type AuthAPI = {
  email: string;
  password: string;
};

export const authAPI = {
  signInWithPassword: async ({ email, password }: AuthAPI) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw new Error(error.message);
    return data;
  },
  signUpWithPassword: async ({ email, password }: AuthAPI) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "http://mysociallink.vercel.app/email-confirm",
      },
    });
    if (error) throw new Error(error.message);
    return data;
  },
  signInWithGoogle: async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });
    if (error) throw new Error(error.message);
    return data;
  },
};
