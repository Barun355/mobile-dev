/**
 * Auth store (zustand) — basic local auth for the demo.
 *
 * - `account` is the registered user and is the ONLY persisted field. It
 *   survives app restarts so we know the user already signed up.
 * - `isAuthenticated` is the live session and is NOT persisted, so every cold
 *   start sends a registered user back to the sign-in screen.
 * - `logout` flushes the persisted account entirely.
 */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { currentUser } from "@/constants/data";

export type Account = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};

type SignUpInput = { name: string; email: string; password: string };
type AuthResult = { ok: boolean; error?: string };

type AuthState = {
  account: Account | null;
  isAuthenticated: boolean;
  hasHydrated: boolean;
  signUp: (input: SignUpInput) => void;
  signIn: (email: string, password: string) => AuthResult;
  socialAuth: (user: { name: string; email: string }) => void;
  logout: () => void;
  setHasHydrated: (value: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      account: null,
      isAuthenticated: false,
      hasHydrated: false,

      signUp: ({ name, email, password }) =>
        set({
          account: { name, email, password, avatar: currentUser.avatar },
          isAuthenticated: true,
        }),

      signIn: (email, password) => {
        const account = get().account;
        if (!account) {
          return { ok: false, error: "No account found. Please sign up first." };
        }
        const emailMatches =
          account.email.trim().toLowerCase() === email.trim().toLowerCase();
        if (!emailMatches || account.password !== password) {
          return { ok: false, error: "Incorrect email or password." };
        }
        set({ isAuthenticated: true });
        return { ok: true };
      },

      socialAuth: ({ name, email }) =>
        set({
          account: { name, email, password: "", avatar: currentUser.avatar },
          isAuthenticated: true,
        }),

      // Flush the persisted account + session.
      logout: () => set({ account: null, isAuthenticated: false }),

      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "tastio-auth",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ account: state.account }),
      onRehydrateStorage: () => (state) => state?.setHasHydrated(true),
    },
  ),
);
