import { create } from "zustand";
import { persist } from "zustand/middleware";

type CookieState = {
  acceptCookies: boolean;
  setAcceptCookies: (accept: boolean) => void;
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
};

export const useCookieState = create<CookieState>()(
  persist(
    (set) => ({
      acceptCookies: false,
      hasHydrated: false,
      setAcceptCookies: (accept) => set({ acceptCookies: accept }),
      setHasHydrated: (state) => set({ hasHydrated: state }),
    }),
    {
      name: "cookies-state",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
