import { create } from "zustand";

type Verify = {
  userId: string ;
  setUserId: (userId: string) => void;
};

export const useVerifyStore = create<Verify>((set) => ({
  userId: "",
  setUserId: (params) => set({ userId: params }),
}));
