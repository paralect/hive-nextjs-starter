"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from '@/types/user';

type UserStore = {
  user: null | User;
  setUser: (user: User) => void;
  updateUser: (user: User) => void;
  logout: () => void;
  shadowToken: null | string;
  setShadowToken: (shadowToken: string) => void;
};



const useUserStore = create<UserStore>((set) => ({
  user: null,

  setUser: (user: User) => set({ user }),
  updateUser: (user) => {
    return set((state) => ({
      user: {
        ...state.user,
        ...user,
      },
    }));
  },

  logout: () => {
    return set((state) => ({
      user: null,
    }));
  },

  shadowToken: typeof window !== "undefined" ? window.sessionStorage.getItem("shadowToken") : null,
  setShadowToken: (shadowToken) => {
    set({ shadowToken });
    
    if (typeof window !== "undefined") {
      if (shadowToken) {
        window.sessionStorage.setItem("shadowToken", shadowToken);
      } else {
        window.sessionStorage.removeItem("shadowToken");
      }
    }
  }
}));

export default useUserStore;
