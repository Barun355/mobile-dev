/**
 * Theme provider + hook.
 *
 * Defaults to the OS color scheme but allows a manual override via `setPreference`
 * / `toggle`. Consume the resolved palette anywhere with `useTheme()`.
 */
import {
  createContext,
  use,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useColorScheme } from "react-native";

import { Colors, type ColorScheme, type ThemeColors } from "@/constants/theme";

/** `"system"` follows the OS; `"light"`/`"dark"` force a scheme. */
export type ThemePreference = "system" | ColorScheme;

type ThemeContextValue = {
  /** Resolved palette for the active scheme. */
  colors: ThemeColors;
  /** The scheme currently in effect. */
  scheme: ColorScheme;
  /** The user's preference (may be `"system"`). */
  preference: ThemePreference;
  /** Set the preference explicitly. */
  setPreference: (preference: ThemePreference) => void;
  /** Flip between light and dark (sets an explicit preference). */
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemScheme = useColorScheme();
  const [preference, setPreference] = useState<ThemePreference>("system");

  const scheme: ColorScheme =
    preference !== "system"
      ? preference
      : systemScheme === "light"
        ? "light"
        : "dark";

  const toggle = useCallback(() => {
    setPreference(scheme === "dark" ? "light" : "dark");
  }, [scheme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      colors: Colors[scheme],
      scheme,
      preference,
      setPreference,
      toggle,
    }),
    [scheme, preference, toggle],
  );

  return <ThemeContext value={value}>{children}</ThemeContext>;
}

export function useTheme(): ThemeContextValue {
  const context = use(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
