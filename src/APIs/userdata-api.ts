import { supabase } from "@/lib/supabase-client";

export const userDataAPI = {
  getUserData: async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select(
        `full_name, username, greeting, about, whatsapp, instagram, linkedin, github, gmail, avatar_url`
      )
      .eq("id", userId)
      .single();
    if (error) throw new Error(error.message);
    return data;
  },
};
